import Blog from "@/Components/Blog/Blog";
import CreatePost from "@/Components/CreatePost/CreatePost";
import React from "react";

const create_post = () => {
  return (
    <div className=" bg-gray-100 min-h-screen">
      {/* <CreatePost /> */}
      <Blog />
    </div>
  );
};

export default create_post;
