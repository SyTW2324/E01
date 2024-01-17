import type { Transaction } from "$lib/db/transactions";

export function calcSummary(transactions: {[tid: string]: Transaction}): {[uid: string]: number} {
    return Object.values(transactions).reduce((acc, val) => {
        Object.entries(calcTransactionShares(val)).forEach(ts => {
            const uid = ts[0];
            const amount = ts[1];
            if (uid in acc) {
                acc[uid] += amount;
            } else {
                acc[uid] = amount;
            }
        });
        return acc;
    }, {} as {[uid: string]: number})
}

function calcTransactionShares(t: Transaction): {[uid: string]: number} {
    const totalMoney = Object.values(t.payments).reduce((acc, val) => acc + val, 0);
    const totalShares = Object.values(t.debtShares).reduce((acc, val) => acc + val, 0);
    const shareCost = totalMoney / totalShares;
    return Object.keys(t.payments).reduce((acc, uid) => {
        acc[uid] = t.payments[uid] - (shareCost * t.debtShares[uid]);
        return acc;
    }, {} as {[uid: string]: number})
}
