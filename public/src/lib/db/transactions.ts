export interface Transaction {
    categories: string[];
    concept: string;
    date: number;
    debtShares: {[key: string]: number};
    gid: string;
    payments: {[key: string]: number};
    tid: string;
}
