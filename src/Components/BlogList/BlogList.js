import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const BlogList = () => {
  const [blogsobj, setBlogobj] = useState([]);

  useEffect(() => {
    retrive_blog();
  }, []);
  console.log("blogsobj", blogsobj);
  async function retrive_blog() {
    await axios
      .get(`https://admin.iou.ac/api/v1/article/`)
      .then((res) => {
        console.log("res", res);
        setBlogobj(res?.data?.results);
        // setBlogobj(res?.data?.data);
      })
      .catch((err) => {});
  }
  return (
    <div className=" bg-white   rounded px-6 py-2 pb-16 w-full min-h-screen  ">
      <div className=" flex justify-end">
        <Link
          href="/dashboard"
          className=" bg-gray-900 text-white px-4 py-2 rounded-lg my-2"
        >
          Add Post
        </Link>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Full Name
              </th>{" "}
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogsobj?.map((item) => (
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={item?.id}
              >
                <th class="px-6 py-4">
                  <p>{item?.title}</p>
                </th>
                <th class="px-6 py-4">
                  <p>{item?.first_name + " " + item?.last_name}</p>
                </th>
                <th class="px-6 py-4">
                  <p>{item?.role}</p>
                </th>

                <td className="px-6 py-4 w-64">
                  <div className="  w-full">
                    <button
                      onClick={() => router.push(`/edit-user/${item?.id}`)}
                      className="mx-1 py-2 bg-yellow-600 text-white px-2  rounded-full"
                    >
                      <BiEdit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item?.id)}
                      className=" py-2 bg-red-600 text-white px-2  rounded-full"
                    >
                      <AiFillDelete size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
