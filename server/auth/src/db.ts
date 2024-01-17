import { Db, MongoClient, ObjectId } from 'mongodb';
import { User } from './db_types.js';

export const ErrNotFound = "Not found";
const colUsers = "users";

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

export async function findUserByEmail(email: string): Promise<User> {
  const user = await db!.collection(colUsers).findOne({email: email});
  if (!user) {
    throw ErrNotFound;
  }
  return {
    uid: user._id.toString(),
    email: user.email,
    image: user.image,
    name: user.name,
    pass: user.pass
  }
}

export async function writeUser(user: User) {
  const uid = new ObjectId();
  user.uid = uid.toString();

  await db!.collection(colUsers).insertOne({
    _id: uid,
    email: user.email,
    image: user.image,
    name: user.name,
    pass: user.pass
  });
  
  return user;
}
