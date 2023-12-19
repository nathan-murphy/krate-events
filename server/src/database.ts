import * as mongodb from "mongodb";
import { User } from "./user/user";
 
export const collections: {
   users?: mongodb.Collection<User>;
} = {};
 
export async function connectToDatabase(uri: string, dbName: string) {
    if(uri == 'test' || dbName == 'test') return
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db(dbName);
   await applySchemaValidation(db);
 
   const UserCollection = db.collection<User>("User");
   collections.users = UserCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our User model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: [""],
           additionalProperties: false,
           properties: {
               _id: {},
               fName: {
                   bsonType: "string",
                   description: "'fName' is required and is a string"
               },
               lName: {
                   bsonType: "string",
                   description: "'lName' is required and is a string"
               },
               attchedTo: {
                   bsonType: "object",
                   description: "'attachedTo' is required and is a different User object"
               },
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "Users",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("Users", {validator: jsonSchema});
       }
   });
}