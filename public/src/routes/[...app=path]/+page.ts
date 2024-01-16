import { goto } from '$app/navigation';
import { getUserInfo, type UserInfo } from '$lib/auth/session.js';
import { getGroups, type Group } from '$lib/db/groups.js';
import { getTransactions, type Transaction } from '$lib/db/transactions.js';
import { parse as parsePath, type Path } from '$lib/path/path.js';
import { isPrerender } from '$lib/prerender/check.js';

export interface PageData {
    groups: Group[],
    path: Path,
    transactions: Transaction[],
    user: UserInfo,
}

export const ssr = false;

export async function load({ params }): Promise<PageData> {
    if (isPrerender) {
        return prerenderData();
    }

    let groups: Group[] = [];
    let transactions: Transaction[] = [];

    const user = getUserInfo();
    if (user) {
        groups = await getGroups(user.uid);
    } else {
        goto("/login");
    }

    const path = parsePath(params.app)!;
    if (path?.group) {
        transactions = await getTransactions(path?.group);
    }

    return {
        groups,
        path,
        transactions,
        user: user!
    }
}

function prerenderData(): PageData {
    return {
        groups: [],
        path: {},
        transactions: [],
        user: {
            email: "me@example.com",
            image: 1,
            name: "John Doe",
            uid: "a39f2aa7-56f0-466b-b641-31210a403a30",
        }
    }
}
