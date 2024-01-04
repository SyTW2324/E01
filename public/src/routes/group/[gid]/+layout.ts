import { getTransactions } from '$lib/db/transactions.js';

export async function load({ params }) {
    const transactions = await getTransactions(params.gid);
    return {
        gid: params.gid,
        transactions
    };
}
