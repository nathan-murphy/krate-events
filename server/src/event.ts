import * as mongodb from "mongodb";
import { User } from "./user/user"

export interface Event {
    name: string;
    guests: [User];
    _id?: mongodb.ObjectId;
}
