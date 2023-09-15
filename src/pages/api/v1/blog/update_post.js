// pages/api/update-post.js
import { connectToDatabase } from "@/Components/util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { db } = await connectToDatabase();
    try {
      const { postId, title, content } = req.body;
      console.log(req.body);
      let thumbnailBase64 = null;

      if (req.files && req.files.thumbnail) {
        // Handle the uploaded file (assuming you're using 'express-fileupload')
        const thumbnail = req.files.thumbnail;
        const thumbnailData = thumbnail.data.toString("base64");
        const thumbnailMimeType = thumbnail.mimetype;
        thumbnailBase64 = `data:${thumbnailMimeType};base64,${thumbnailData}`;
      }
      const postID = new ObjectId(postId);
      // Replace with your MongoDB connection code

      const response = await db.collection("posts").updateOne(
        { _id: postID }, // Assuming postId is the MongoDB ObjectId of the post to update
        {
          $set: {
            title,
            content,
          },
        }
      );
      console.log("response", response);
      if (response.modifiedCount === 1) {
        res.status(200).json({
          status: "success",
          response,
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

async function handler2(req, res) {
  if (req.method === "PATCH") {
    try {
      // Parse the incoming data from the request body
      const { postId, title, content } = req.body;

      // Connect to your database (use your own database connection code)
      const { db } = await connectToDatabase();

      // Update the post in the database (assuming MongoDB)
      const response = await db.collection("posts").updateOne(
        { _id: postId }, // Use the appropriate filter criteria to identify the post
        {
          $set: {
            title,
            content,
          },
        }
      );

      if (response.modifiedCount === 1) {
        // The update was successful
        res.status(200).json({ status: "success" });
      } else {
        // No documents were updated, indicating that the post wasn't found
        res.status(404).json({ error: "Post not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
}
