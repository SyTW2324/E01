import { fetchJSON } from "$lib/auth";
import config from "$lib/config.json";

export interface Transaction {
    categories: string[];
    concept: string;
    date: number;
    debtShares: {[key: string]: number};
    gid: string;
    payments: {[key: string]: number};
    tid: string;
}

export async function getTransactions(gid: string): Promise<Transaction[]> {
    return await fetchJSON(`${config.db}/group/${gid}/transaction`, {}, "GET");
}

export async function postNewTransactionForGroup(transaction: Transaction, gid: string) {
    return await fetchJSON(`${config.db}/group/${gid}/transaction`)
}

export async function updateTransaction(transaction: Transaction) {
    return await fetchJSON(`${config.db}/group/${transaction.gid}/transaction/${transaction.tid}`, {}, "PUT")
}

export async function deleteTransactionOfGroup(gid: string, tid: string) {
    return await fetchJSON(`${config.db}/group/${gid}/transaction/${tid}`, {}, "DELETE")
}