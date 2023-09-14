import { useRouter } from "next/router";
import React, { useState } from "react";

const Sidebar = ({}) => {
  const [activeState, setActiveState] = useState(0);
  const sitebarData = ["Create Post", "Blog List"];
  const router = useRouter();
  const handlesidebar = (index) => {
    if (index === 1) {
      router.push("/dashboard");
    }
    if (index === 2) {
      router.push("/dashboard/blog_list");
    }
  };
  return (
    <div className=" w-52 bg-white border shadow-sm rounded-sm  pt-4 pb-7">
      <h3 className=" my-2 font-bold text-center">Side Bar Menu</h3>

      <div
        onClick={() => handlesidebar(1)}
        className={` ${
          router.pathname === "/dashboard" && " bg-gray-100"
        } form-check flex  p-2  `}
      >
        <input
          checked={router.pathname === "/dashboard"}
          className="  text-sm bg-img-none accent-red-500 form-check-input appearance-none rounded-full h-3 w-3 border border-gray-300 bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none  mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          id={1}
        />
        <label
          className={`${
            router.pathname === "/dashboard" && " text-red-500 font-bold"
          } form-check-label inline-block text-sm`}
          for={1}
        >
          Create Post
        </label>
      </div>
      <div
        onClick={() => handlesidebar(2)}
        className={` ${
          router.pathname.includes("dashboard/blog_list") && " bg-gray-100"
        } form-check flex  p-2  `}
      >
        <input
          checked={router.pathname.includes("dashboard/blog_list")}
          className="  text-sm bg-img-none accent-red-500 form-check-input appearance-none rounded-full h-3 w-3 border border-gray-300 bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none  mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name="flexRadioDefault"
          id={2}
        />
        <label
          className={`${
            router.pathname.includes("dashboard/blog_list") &&
            " text-red-500 font-bold"
          } form-check-label inline-block text-sm`}
          for={2}
        >
          Blog List
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
