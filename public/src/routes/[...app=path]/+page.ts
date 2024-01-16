import { getUserInfo } from '$lib/auth/session.js';
import { getGroups, type Group } from '$lib/db/groups.js';
import { getTransactions, type Transaction } from '$lib/db/transactions.js';
import { parse as parsePath } from '$lib/path/path.js';

export const ssr = false;

export async function load({ params }) {
    let groups: Group[] = [];
    let transactions: Transaction[] = [];

    const user = getUserInfo();
    if (user) {
        groups = await getGroups(user.uid);
    }

    const path = parsePath(params.app);
    if (path?.group) {
        transactions = await getTransactions(path?.group);
    }

    return {
        groups,
        path,
        transactions,
        user
    }
}
