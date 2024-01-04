import { getTransactions } from '$lib/db/transactions.js';

export async function load({ params }) {
    const transactions = await getTransactions(params.group);
    return {
        group: params.group,
        transactions
    };
}
