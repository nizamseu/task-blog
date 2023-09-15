// pages/api/update-post.js
import { connectToDatabase } from "@/Components/util/mongodb";
import formidable from "formidable";
import { ObjectId } from "mongodb";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const postID = new ObjectId(id);
      // const { db } = await connectToDatabase();

      const response = await db.collection("posts").findOne({ _id: postID });

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
  } else if (req.method === "PATCH") {
    const { id } = req.query;
    const { title, content, thumbnail, createdAt } = req.body;
    const postID = new ObjectId(id);

    const response = await db.collection("posts").updateOne(
      { _id: postID },
      {
        $set: {
          thumbnail,
          title,
          content,
          updatedAt: new Date(),
        },
      }
    );

    if (response.modifiedCount === 1) {
      res.status(200).json({
        status: "success",
        response,
      });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    const postID = new ObjectId(id);

    const response = await db.collection("posts").deleteOne({ _id: postID });

    if (response.deletedCount === 1) {
      res.status(200).json({
        status: "success",
        response,
      });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
