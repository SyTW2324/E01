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
    // TODO use real API
    return (await fetch(`http://localhost:5173/test-transactions-${gid}.json`)).json();
}
