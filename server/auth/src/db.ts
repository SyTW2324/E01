import { Db, MongoClient } from 'mongodb';
import { User } from './db_types';

let db: Db|null = null;

export function connect(uri: string) {
  if (!db) {
    db = new MongoClient(uri).db("ShareTheCost");
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
