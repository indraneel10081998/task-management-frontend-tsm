import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar/Sidebar";

const PrimaryLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#FAFAFA]">

    <div className="w-[250px] bg-white rounded-r-3xl border-r-[1px] border-[#F3F3F3] shadow">

      <Sidebar />
    </div>
    <div className="w-[calc(100%_-_250px)]">
      <Outlet />
      </div>
    </div>
  );
};

export default PrimaryLayout;
