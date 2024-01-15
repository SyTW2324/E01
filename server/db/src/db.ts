import { Db, MongoClient } from 'mongodb';
import { Group, Transaction } from './db_types.js';
import { ObjectId } from 'mongodb';

export const ErrNotFound = "Not found";

const colGroups = "groups";
const colTransactions = "transactions";

let client: MongoClient|null = null;
let db: Db|null = null;

export function connect(uri: string) {
  if(!db) {
    client = new MongoClient(uri);
    db = client.db("ShareTheCost");
  }
}

export async function disconnect() {
  if (db) {
    await client?.close();
    client = null;
    db = null;
  }
}

export async function getGroups(uid: string): Promise<Group[]> {
  const filter: {[key: string]: unknown} = {};
  filter[`members.${uid}`] = { $exists: true };

  const dbGroups = await db!.collection(colGroups).find(filter).toArray();
  return dbGroups.map(group => {
    return {
      gid: group._id.toString(),
      name: group.name,
      members: group.members
    }
  });
}

export async function getGroupByGID(gid: string): Promise<Group> {
  const group = await db!.collection(colGroups).findOne({_id: new ObjectId(gid)});
  if (!group) {
    throw ErrNotFound;
  }
  return {
    gid,
    name: group.name,
    members: group.members
  }
}

export async function getTransactionByTID(tid: string): Promise<Transaction> {
  const transaction = await db!.collection(colTransactions).findOne({_id: new ObjectId(tid)});
  if (!transaction) {
    throw ErrNotFound;
  }
  return {
    tid,
    categories: transaction.categories,
    concept: transaction.concept,
    date: transaction.date,
    debtShares: transaction.debtShares,
    gid: transaction.gid,
    payments: transaction.payments
  }
}

export async function getGroupTransactions(gid: string): Promise<Transaction[]> {
  const group = await db!.collection(colGroups).findOne({_id: new ObjectId(gid)});
  if (!group) {
    throw ErrNotFound;
  }
  
  const dbTransaction = await db!.collection(colTransactions).find({gid}).toArray();
  return dbTransaction.map(t => {
    const { _id, ...transaction } = t;
    return {
      tid: _id.toString(),
      ...transaction
    } as Transaction
  });
}
  
export async function createGroup(group: Group): Promise<Group> {
  const gid = new ObjectId();
  group.gid = gid.toString();

  await db!.collection(colGroups).insertOne({
    _id: gid,
    name: group.name,
    members: group.members
  });

  return group;
}

export async function createTransaction(transaction: Transaction): Promise<Transaction> {
  const tid = new ObjectId();
  transaction.tid = tid.toString();

  await db!.collection(colTransactions).insertOne({
    _id: tid,
    categories: transaction.categories,
    concept: transaction.concept,
    date: transaction.date,
    debtShares: transaction.debtShares,
    gid: transaction.gid,
    payments: transaction.payments
  });
  return transaction;
}

export async function updateGroup(data: Group): Promise<Group> {
  const { gid, ...group } = data;
  const _id = new ObjectId(gid);
  if (!((await db!.collection(colGroups).replaceOne({ _id }, group)).matchedCount)) {
    throw ErrNotFound;
  };
  return data;
}

export async function updateTransaction(data: Transaction): Promise<Transaction> {
  const { tid, ...transaction } = data;
  const _id = new ObjectId(tid);
  if (!((await db!.collection(colTransactions).replaceOne({ _id }, transaction)).matchedCount)) {
    throw ErrNotFound;
  };
  return data;
}

export async function updateGroupFields(gid: string, fields: {[key: string]: unknown}): Promise<Group> {
  const _id = new ObjectId(gid);
  const group = (await db!.collection(colGroups).findOneAndUpdate({ _id }, { $set: fields }, { returnDocument: "after" }));
  if (!group) {
    throw ErrNotFound;
  }
  return {
    gid,
    members: group.members,
    name: group.name,
  };
}

export async function updateTransactionFields(tid: string, fields: {[key: string]: unknown}): Promise<Transaction> {
  const _id = new ObjectId(tid);
  const t = (await db!.collection(colTransactions).findOneAndUpdate({ _id }, { $set: fields }, { returnDocument: "after" }));
  if (!t) {
    throw ErrNotFound;
  }
  return {
    tid,
    categories: t.categories,
    concept: t.concept,
    date: t.date,
    gid: t.gid,
    debtShares: t.debtShares,
    payments: t.payments,
  };
}

export async function deleteGroup(gid: string): Promise<void> {
  const deleteTransactionsPromise = db!.collection(colTransactions).deleteMany({ gid });
  if (!(await db!.collection(colGroups).deleteOne({ _id: new ObjectId(gid) })).deletedCount) {
    throw ErrNotFound;
  }
  await deleteTransactionsPromise;
}

export async function deleteTransaction(tid: string) {
  if (!((await db!.collection(colTransactions).deleteOne({_id: new ObjectId(tid)})).deletedCount)) {
    throw ErrNotFound;
  }
}