import { ObjectId } from "mongodb";

export interface Group {
  gid?: string;
  members: {[uid: string]: string};
  name: string;
}

export interface Transaction {
  categories: string[];
  concept: string;
  date: number;
  debtShares: {[key: string]: number};
  gid: string;
  payments: {[key: string]: number};
  tid?: string;
}
