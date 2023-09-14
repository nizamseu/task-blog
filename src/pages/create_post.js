import Blog from "@/Components/Blog/Blog";
import CreatePost from "@/Components/CreatePost/CreatePost";
import Sidebar from "@/Components/Sidebar.js/Sidebar";
import React, { useState } from "react";

const Create_post = () => {
  const [activeState, setActiveState] = useState(0);

  return (
    <div className=" bg-gray-100 min-h-screen ">
      {/* <CreatePost /> */}
      <div className=" flex max-w-5xl mx-auto space-x-5">
        <div className=" mt-5 w-52  ">
          <Sidebar activeState={activeState} setActiveState={setActiveState} />
        </div>
        <Blog />
      </div>
    </div>
  );
};

export default Create_post;
