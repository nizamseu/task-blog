import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
const CreatePost = () => {
  const [description, setDescription] = useState(null);
  return (
    <div>
      <div className=" pt-6">
        <label className=" text-sm font-bold form-label inline-block mb-2 ">
          Description
        </label>
        <ReactQuill
          className=" h-56"
          modules={modules}
          value={description}
          onChange={setDescription}
        />
      </div>
    </div>
  );
};

export default CreatePost;
