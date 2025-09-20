import clientPromise from "../src/lib/mongodb.js";
import bcrypt from "bcryptjs";

export async function createUser(email, password) {
  const client = await clientPromise;
  const db = client.db(); // usa la DB definida en tu URI
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({ email, password: hashedPassword });
  return result;
}

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").findOne({ email });
  return user;
}
