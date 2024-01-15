import { Db, MongoClient } from 'mongodb';
import { User } from './db_types';

let client: MongoClient|null = null;
let db: Db|null = null;

export function connect(uri: string) {
  if (!db) {
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

export async function findUserByEmail(email: string): Promise<User|null> {
  const dbUser = await db!.collection("users").findOne({email});
  if (!dbUser) {
    return null;
  }
  // TODO check
  return dbUser as any as User
}

export function writeUser(user: User) {
  return db!.collection("users").insertOne(user);
}
