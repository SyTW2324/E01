import { Db, MongoClient } from 'mongodb';
import { Group, Transaction } from './db_types';
import { ObjectId } from 'mongodb';

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

export async function getAllGroups(): Promise<Group[]|null> {
  const dbGroup = await db!.collection("groups").find().toArray();
  
  if (!dbGroup) {
    return null;
  }
  // TODO check
  return dbGroup as any as Group[]
}

export async function findGroupByGID(GID: string): Promise<Group|null> {
  const dbGroup = await db!.collection("groups").findOne({_id: new ObjectId(GID)});
  console.log(dbGroup)
  if (!dbGroup) {
    return null;
  }
  // TODO check
  return dbGroup as any as Group
}

export async function findTransactionsOfGroup(GID: string): Promise<Transaction[]|null> {
  const dbTransaction = await db!.collection("transactions").find({gid: GID}).toArray();
  if (!dbTransaction) {
    return null;
  }
  // TODO check
  return dbTransaction as any as Transaction[]
}
  
export function writeGroup(group: Group) {
  return db!.collection("groups").insertOne(group);
}

export function writeTransactionsForGroup(transaction: Transaction) {
  return db!.collection("transactions").insertOne(transaction);
}

export async function updateGroup(group: Group, GID: string): Promise<Group|null> {
  const dbGroupUpdate = await db!.collection("groups").findOneAndUpdate({_id: new ObjectId(GID)}, {$set: group})
  if (!dbGroupUpdate) {
    return null;
  }
  // TODO check
  return dbGroupUpdate as any as Group
}

export async function updateTransaction(transaction: Transaction, TID: string): Promise<Transaction|null> {
  const dbTransactionUpdate = await db!.collection("transactions").findOneAndUpdate({_id: new ObjectId(TID)}, {$set: transaction});
  if (!dbTransactionUpdate) {
    return null;
  }
  // TODO check
  return dbTransactionUpdate as any as Transaction
}

export async function updatePartialGroup(data: {[key: string]: string}, GID: string): Promise<Group|null> {
  let dbPartialGroups;
  for (const key of Object.keys(data)) {
    dbPartialGroups = await db!.collection("groups").findOneAndUpdate({_id: new ObjectId(GID)}, {$set: {[key]: data[key]}})
  }
  if (!dbPartialGroups) {
    return null;
  }
  return dbPartialGroups as any as Group;

}

export async function updatePartialTransaction(data: {[key: string]: string}, TID: string): Promise<Transaction|null> {
  let dbPartialTransaction;
  for (const key of Object.keys(data)) {
    dbPartialTransaction = await db!.collection("transaction").findOneAndUpdate({_id: new ObjectId(TID)}, {$set: {[key]: data[key]}})
  }
  if (!dbPartialTransaction) {
    return null;
  }
  return dbPartialTransaction as any as Transaction;
}

export function deleteGroup(GID: string) {
  db!.collection("transactions").deleteMany({gid: GID});
  return db!.collection("groups").findOneAndDelete({_id: new ObjectId(GID)});
}

export function deleteTransactionForGroup(TID: string) {
  return db!.collection("transactions").findOneAndDelete({_id: new ObjectId(TID)})
}