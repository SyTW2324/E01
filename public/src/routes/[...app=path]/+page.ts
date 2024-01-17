import { goto } from '$app/navigation';
import { logout } from '$lib/auth/index.js';
import { getUserInfo, type UserInfo } from '$lib/auth/session.js';
import { getGroups, type Group } from '$lib/db/groups.js';
import { getTransactions, type Transaction } from '$lib/db/transactions.js';
import { parse as parsePath, type Path } from '$lib/path/path.js';
import { isPrerender } from '$lib/prerender/check.js';

export interface PageData {
    groups: {[gid: string]: Group},
    path: Path,
    transactions: {[tid: string]: Transaction},
    user: UserInfo,
}

export async function load({ params }): Promise<PageData> {
    if (isPrerender) {
        return prerenderData();
    }

    let groups: {[gid: string]: Group} = {};
    let transactions: {[tid: string]: Transaction} = {};

    const user = getUserInfo();
    if (!user) {
        goto("/login");
    }
    
    try {
        groups = await getGroups();
    } catch (err) {
        logout();
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
        groups: {},
        path: {},
        transactions: {},
        user: {
            email: "johndoe@example.com",
            image: 1,
            name: "John Doe",
            uid: "65a814a79518dc5baf1b49a5",
        }
    }
}
