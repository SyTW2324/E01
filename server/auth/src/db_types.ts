import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    groups: {[key: string]: string};
    image: number;
    name: string;
    pass: string;
}
