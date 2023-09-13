import { connectToDatabase } from "@/Components/util/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  if (req.method === "POST") {
    try {
      const { title, content } = req.body;
      let thumbnailBase64 = null;

      if (req.files && req.files.thumbnail) {
        // Handle the uploaded file (assuming you're using 'express-fileupload')
        const thumbnail = req.files.thumbnail;
        const thumbnailData = thumbnail.data.toString("base64");
        const thumbnailMimeType = thumbnail.mimetype;
        thumbnailBase64 = `data:${thumbnailMimeType};base64,${thumbnailData}`;
        // console.log("thumbnailBase64", thumbnailBase64);
      }

      const database = db.collection("posts");

      const response = await database.insertOne({
        title,
        thumbnail: thumbnailBase64,
        content,
      });

      res.status(201).json({
        status: "success",
        response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else if (req.method === "GET") {
    const collection = db.collection("posts");
    const respose = await collection.find({}).toArray();
    console.log("respose", respose);
    res.status(200).json({
      status: "success",
      data: respose,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
