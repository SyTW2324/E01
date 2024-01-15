import { ObjectId } from "mongodb";

export interface User {
    uid?: string,
    email: string;
    groups: {[key: string]: string};
    image: number;
    name: string;
    pass: string;
}
