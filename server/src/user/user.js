import * as mongodb from "mongodb";

export interface User {
    fName: string;
    lName: string;
    attachedTo: User;
    _id?: mongodb.ObjectId;
}