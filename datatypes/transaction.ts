import { GID } from "./group";
import { UID } from "./user";

export type TID = string;

export interface Transaction {
    categories: string[];
    concept: string;
    date: number;
    debtShares: {[key: UID]: number};
    gid: GID;
    payments: {[key: UID]: number};
    tid: TID;
}
