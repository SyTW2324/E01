import { ObjectId } from "mongodb";

export interface Group {
  _id?: ObjectId;
  members: {[key: string]: string};
  name: string;
}

export interface Transaction {
  categories: string[];
  concept: string;
  date: number;
  debtShares: {[key: string]: number};
  gid: ObjectId;
  payments: {[key: string]: number};
  _id?: ObjectId;
}


