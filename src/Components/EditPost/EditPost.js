import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { RotatingLines } from "react-loader-spinner";
import { RxCross2 } from "react-icons/rx";

import { useRouter } from "next/router";
import SuccessAlert from "../util/SuccessAlert";

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
const EditPost = () => {
  const [data, setData] = useState({});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isFile, setIsFile] = useState(false);
  const [isdetails, setisdetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    await fetch(`/api/v1/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data?.results?.title);
        setDescription(data?.results?.content);
        setData(data?.results);
        setImageURL(data?.results?.thumbnail);
      })
      .catch((error) => console.error("Error fetching course:", error));
  };
  const handleChange = (e) => {
    setSelectedFile(URL?.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setIsFile(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (description === null || !description) {
      setisdetails(true);
      setIsLoading(false);
      return;
    }
    const data = {
      title,
      content: description,
      thumbnail: imageURL,
    };
    try {
      const response = await axios
        .patch(`/api/v1/blog/${id}`, data)
        .then((res) => {
          SuccessAlert("Post Created Successfully");
          router.push("/dashboard/blog_list");
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } catch (error) {
      setIsLoading(false);
      console.error("Error creating blog post:", error);
    }
  };

  const handleDetails = (e) => {
    setDescription(e);
    setisdetails(false);
  };

  console.log("data", data);
  return (
    <div className="  w-full  mx-auto ">
      <form className=" bg-white p-4 md:p-10 rounded " onSubmit={handleSubmit}>
        <div className=" mb-4">
          <label className=" text-sm font-bold ">Title</label>
          <div className=" w-full  border rounded">
            <textarea
              defaultValue={data?.title}
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
        {imageURL ? (
          <div className=" relative rounded h-32 object-fill w-full md:w-52  flex items-center justify-center  border  ">
            <img
              src={imageURL}
              className="rounded h-32 w-full md:w-52 object-fill "
              id="output"
            />
            <button
              onClick={() => {
                setImageURL(null);
              }}
              className=" text-white hover:text-red-400 hover:bg-white bg-red-400 rounded-full absolute top-0 right-0 "
            >
              <RxCross2 size={30} />
            </button>
          </div>
        ) : (
          <div className=" mb-4">
            <label className=" text-sm font-bold ">Thumbnail URL</label>
            <div className=" w-full  border rounded">
              <input
                defaultValue={data?.imageURL}
                className=" w-full focus:border-none px-4 py-2  "
                required
                type="text"
                name="imageUrl"
                placeholder="thumbnail url"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
            </div>
          </div>
        )}

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

export default EditPost;
