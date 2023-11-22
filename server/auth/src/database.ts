import { MongoClient, ServerApiVersion } from 'mongodb';
import { User } from './interfaces/user';
const uri = "mongodb+srv://test:sharethecost@cluster1.wjioerc.mongodb.net/?retryWrites=true&w=majority";

export async function Write(uri: string, req: Request) {
  const client = new MongoClient(uri);
  const db = client.db("ShareTheCost");
  const collection = db.collection("Users");

  const result = await collection.insertOne(req);
  console.log(result.insertedId);
}

export function CheckUid(uri: string): boolean {
  const client = new MongoClient(uri);
  const db = client.db("ShareTheCost");
  const collection = db.collection("Users");
  
  return true;
}