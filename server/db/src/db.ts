import { Db, MongoClient } from 'mongodb';
import { Group, Transaction } from './db_types.js';
import { ObjectId } from 'mongodb';

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

export function writeTransactionsForGroup(transaction: Transaction) {
  return db!.collection("transactions").insertOne(transaction);
}

export async function updateGroup(data: Group): Promise<Group> {
  const { gid, ...group } = data;
  const _id = new ObjectId(gid);
  await db!.collection(colGroups).replaceOne({ _id }, group);
  return data;
}

export async function updateTransaction(transaction: Transaction, TID: string): Promise<Transaction|null> {
  const dbTransactionUpdate = await db!.collection("transactions").findOneAndUpdate({_id: new ObjectId(TID)}, {$set: transaction});
  if (!dbTransactionUpdate) {
    return null;
  }
  // TODO check
  return dbTransactionUpdate as any as Transaction
}

export async function updateGroupFields(gid: string, fields: {[key: string]: unknown}): Promise<Group> {
  const _id = new ObjectId(gid);
  const group = (await db!.collection(colGroups).findOneAndUpdate({ _id }, { $set: fields }, { returnDocument: "after" }))!;
  return {
    gid,
    members: group.members,
    name: group.name,
  };
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

export async function deleteGroup(gid: string): Promise<void> {
  await Promise.all([
    db!.collection(colTransactions).deleteMany({ gid }),
    db!.collection(colGroups).deleteOne({ _id: new ObjectId(gid) })
  ]);
}

export function deleteTransactionForGroup(TID: string) {
  return db!.collection("transactions").findOneAndDelete({_id: new ObjectId(TID)})
}