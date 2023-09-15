import { connectToDatabase } from "@/Components/util/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { query } = req.query;

      const { db } = await connectToDatabase();

      // Define a regular expression pattern for the search query
      const searchPattern = new RegExp(query, "i"); // 'i' for case-insensitive search

      // Use the `find` method to search for posts that match the query
      const posts = await db
        .collection("posts")
        .find({
          $or: [
            { title: { $regex: searchPattern } },
            { content: { $regex: searchPattern } },
          ],
        })
        .toArray();

      res.status(200).json({ status: "success", data: posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
