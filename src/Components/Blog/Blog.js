import React from "react";
import { useState } from "react";
import axios from "axios";

const Blog = () => {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null, // Store the image as a File object
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/blog/blog", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, thumbnail: file });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {/* Add your Rich Text Editor */}
        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  );
};

export default Blog;
