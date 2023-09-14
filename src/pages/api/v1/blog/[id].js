// pages/api/update-post.js
import { connectToDatabase } from "@/Components/util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const postID = new ObjectId(id);
      const { db } = await connectToDatabase();

      const response = await db.collection("posts").findOne({ _id: postID });
      console.log("response", response);
      if (response) {
        res.status(200).json({
          status: "success",
          results: response,
        });
      } else {
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
