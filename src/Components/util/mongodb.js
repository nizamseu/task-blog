// utils/mongodb.js
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://nizam:4hLuI1HvtpAlbOQn@cluster0.kxkg5.mongodb.net"
);

export async function connectToDatabase() {
  //   const client = await MongoClient.connect(
  //     "mongodb+srv://nizam:4hLuI1HvtpAlbOQn@cluster0.kxkg5.mongodb.net"
  //   );
  await client.connect();
  const db = client.db("blog");

  return { client, db };
}
