import * as mongodb from "mongodb";

export interface person {
    address: string;
    alias: string;
    _id?: mongodb.ObjectId;
}
