export interface Transaction {
  categories: string[];
  concept: string;
  date: number;
  debtShares: {[key: string]: number};
  gid: string;
  payments: {[key: string]: number};
  _id?: string;
}

export async function getTransactions(): Promise<Transaction[]> {
  // TODO use real API
  return (await fetch("http://localhost:5173/test-transaction.json")).json()
}
