import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

export async function connectDB() {
  await client.connect();
  db = client.db("employee_directory");
  return db;
}

export function getDb() {
  if (!db) throw new Error("Database not connected");
  return db;
}
