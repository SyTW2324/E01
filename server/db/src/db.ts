import { Db, MongoClient } from 'mongodb';
import { Group, Transaction } from './db_types';

let db: Db|null = null;

export function connect(uri: string) {
  if(!db) {
    db = new MongoClient(uri).db("ShareTheCost")
  }
}

export async function getAllGroups(): Promise<Group|null> {
  const dbGroup = await db!.collection("groups").find();
  if (!dbGroup) {
    return null;
  }
  // TODO check
  return dbGroup as any as Group
}

export async function findGroupByGID(GID: string): Promise<Group|null> {
  const dbGroup = await db!.collection("groups").findOne({GID});
  if (!dbGroup) {
    return null;
  }
  // TODO check
  return dbGroup as any as Group
}

export async function findTransactionsOfGroup(GID: string): Promise<Transaction|null> {
  const dbTransaction = await db!.collection("transactions").find({GID});
  if (!dbTransaction) {
    return null;
  }
  // TODO check
  return dbTransaction as any as Transaction
}
  
export function writeGroup(group: Group) {
  return db!.collection("groups").insertOne(group);
}

export function writeTransactionsForGroup(transaction: Transaction) {
  return db!.collection("transactions").insertOne(transaction);
}

export async function updateGroup(group: Group): Promise<Group|null> {
  const dbGroupUpdate = await db!.collection("groups").findOneAndUpdate({gid: group._id}, group)
  if (!dbGroupUpdate) {
    return null;
  }
  // TODO check
  return dbGroupUpdate as any as Group
}

export async function updateTransaction(transaction: Transaction): Promise<Transaction|null> {
  const dbTransactionUpdate = await db!.collection("transactions").findOneAndUpdate({tid: transaction._id}, transaction);
  if (!dbTransactionUpdate) {
    return null;
  }
  // TODO check
  return dbTransactionUpdate as any as Transaction
}

export async function updatePartialGroup(data: {[key: string]: string}, GID: string): Promise<Group|null> {
  let dbPartialGroups;
  for (const key of Object.keys(data)) {
    dbPartialGroups = await db!.collection("groups").findOneAndUpdate({gid: GID}, {$set: {[key]: data[key]}})
  }
  if (!dbPartialGroups) {
    return null;
  }
  return dbPartialGroups as any as Group;

}

export async function updatePartialTransaction(data: {[key: string]: string}, TID: string): Promise<Transaction|null> {
  let dbPartialTransaction;
  for (const key of Object.keys(data)) {
    dbPartialTransaction = await db!.collection("transaction").findOneAndUpdate({tid: TID}, {$set: {[key]: data[key]}})
  }
  if (!dbPartialTransaction) {
    return null;
  }
  return dbPartialTransaction as any as Transaction;
}

export function deleteGroup(GID: string) {
  db!.collection("transactions").deleteMany({gid: GID});
  return db!.collection("groups").findOneAndDelete({gid: GID});
}

export function deleteTransactionForGroup(TID: string) {
  return db!.collection("transactions").findOneAndDelete({tid: TID})
}