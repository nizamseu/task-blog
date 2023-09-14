import React, { useState } from "react";
import Sidebar from "../Sidebar.js/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className=" bg-gray-100 min-h-screen   ">
      {/* <CreatePost /> */}
      <div className=" mx-10">
        <div className=" grid grid-cols-12 gap-10">
          <div className=" col-span-2 mt-5 w-52  ">
            <Sidebar />
          </div>
          <div className=" col-span-10 mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
