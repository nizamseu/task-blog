import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import SuccessAlert from "../util/SuccessAlert";
import Swal from "sweetalert2";
const BlogList = () => {
  const [blogsobj, setBlogobj] = useState([]);
  const router = useRouter();
  useEffect(() => {
    retrive_blog();
  }, []);

  async function retrive_blog() {
    await axios
      .get(`/api/v1/blog/blog/`)
      .then((res) => {
        // setBlogobj(res?.data?.results);
        setBlogobj(res?.data?.data);
      })
      .catch((err) => {});
  }

  async function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteBlog = async () => {
          await axios
            .delete(`http://localhost:3000/api/v1/blog/${id}/`)
            .then((res) => {
              retrive_blog();
              SuccessAlert("DELETED", "error");
            })
            .catch((err) => {});
        };
        deleteBlog();
      }
    });
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

                <td className="px-6 py-4 w-64">
                  <div className="  w-full">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/edit_post/${item?._id}`)
                      }
                      className="mx-1 py-2 bg-yellow-600 text-white px-2  rounded-full"
                    >
                      <BiEdit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(item?._id)}
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
