import React from "react";
import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { RotatingLines } from "react-loader-spinner";
import SuccessAlert from "../util/SuccessAlert";
import { useRouter } from "next/router";

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
const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [isdetails, setisdetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setSelectedFile(URL?.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setIsFile(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (file === null || selectedFile === null) {
      setIsFile(true);
      setIsLoading(false);
      return;
    }

    if (description === null || !description) {
      setisdetails(true);
      setIsLoading(false);
      return;
    }
    const data = {
      title,
      content: description,
      thumbnail: file,
    };
    try {
      const response = await axios
        .post("/api/v1/blog/blog", data)
        .then((res) => {
          SuccessAlert("Post Created Successfully");
          router.push("/dashboard/blog_list");
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  const handleDetails = (e) => {
    setDescription(e);
    setisdetails(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, thumbnail: file });
  };
  return (
    <div className="  w-full  mx-auto ">
      <form className=" bg-white p-4 md:p-10 rounded " onSubmit={handleSubmit}>
        <div className=" mb-4">
          <label className=" text-sm font-bold ">Title</label>
          <div className=" w-full  border rounded">
            <textarea
              className=" w-full focus:border-none px-4 py-2  "
              required
              type="text"
              name="title"
              placeholder="Content Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className=" text-sm font-bold form-label ">Thumbnail</label>
          {/* modal Content  */}
          <div>
            <div className="  ">
              <input
                accept="image/png, image/jpeg"
                type="file"
                className="hidden"
                id="image-upload"
                onChange={handleChange}
                name="thumbnail"
              />
              <label
                htmlFor="image-upload"
                className=" rounded h-32 object-fill w-full md:w-52   cursor-pointer flex items-center justify-center  border border-gray-400 text-gray-400  hover:bg-gray-100"
              >
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="rounded h-32 w-full md:w-52 object-fill "
                    id="output"
                  />
                ) : (
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h32a2 2 0 002-2V6a2 2 0 00-2-2h2a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}

                <span className="text-lg font-medium">
                  {selectedFile ? selectedFile.name : ""}
                </span>
              </label>
            </div>
          </div>
          {isFile && (
            <p className="text-sm my-2">
              {" "}
              <div className="flex items-center space-x-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-[#D9001B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </div>
                <div className="text-[#D9001B]">Select an thumbnail</div>
              </div>{" "}
            </p>
          )}
        </div>

        <div className=" relative mt-6">
          <label className=" text-sm font-bold form-label  mb-2 ">
            Blog Details
          </label>
          <ReactQuill
            required
            className="h-32 md:h-56 w-full"
            modules={modules}
            value={description}
            onChange={(e) => handleDetails(e)}
          />

          {isdetails && (
            <p className="text-sm my-2">
              {" "}
              <div className="flex items-center space-x-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 text-[#D9001B]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </div>
                <div className="text-[#D9001B]">
                  Details field cannot be empty
                </div>
              </div>{" "}
            </p>
          )}
        </div>

        {/* Add your Rich Text Editor */}
        <div className=" mt-28 md:mt-16  flex justify-end">
          <button
            disabled={isLoading}
            className="  border px-4 py-2 bg-gray-950 hover:bg-gray-800  text-white rounded "
            type="submit"
          >
            {isLoading ? (
              <div
                // style={{ width: "150px" }}
                className=" flex justify-center items-center w-40  "
              >
                {" "}
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              </div>
            ) : (
              <p className=" w-40"> Create Blog Post</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Blog;
