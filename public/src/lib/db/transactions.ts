import { fetch, fetchJSON } from "$lib/auth";
import config from "$lib/config.json";
import type { Group } from "./groups";

export interface Transaction {
    categories: string[];
    concept: string;
    date: number;
    debtShares: {[key: string]: number};
    gid: string;
    payments: {[key: string]: number};
    tid: string;
}

export async function getTransactions(gid: string): Promise<{[tid: string]: Transaction}> {
    return (await (await fetch(`${config.db}/group/${gid}/transaction`)).json()).transactions.reduce((acc, val) => {
        acc[val.tid] = val;
        return acc;
    }, {} as {[tid: string]: Transaction});
}

export async function createTransaction(group: Group) {
    const debtShares = {} as {[key: string]: number};
    const payments = {} as {[key: string]: number};
    Object.keys(group.members).forEach(uid => {
        debtShares[uid] = 1;
        payments[uid] = 0;
    });
    return (await fetchJSON(`${config.db}/group/${group.gid}/transaction`, {
        categories: [],
        concept: "@ New Transaction",
        date: Math.round(new Date().getTime() / 1000),
        debtShares,
        gid: group.gid,
        payments
    }));
}

export async function updateTransaction(transaction: Transaction) {
    return await fetchJSON(`${config.db}/group/${transaction.gid}/transaction/${transaction.tid}`, transaction, "PUT");
}

export async function deleteTransactionOfGroup(gid: string, tid: string) {
    return (await fetch(`${config.db}/group/${gid}/transaction/${tid}`, {method: "DELETE"})).json();
}