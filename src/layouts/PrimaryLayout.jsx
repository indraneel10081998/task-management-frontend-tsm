import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sideBar/Sidebar";

const PrimaryLayout = () => {
  return (
    <>
      <div className="min-h-screen flex bg-[#FAFAFA]">
        <div className="w-[250px] bg-white rounded-r-3xl border-r-[1px] border-[#F3F3F3] shadow hidden sm:block">
          <Sidebar />
        </div>
        <div className="w-full sm:w-[calc(100%_-_250px)]">
          <Outlet />
        </div>
      </div>
      <div className="block sm:hidden p-4 bg-[#fafafa]">
        <hr className="border-gray-300 mb-2" />
        <div
          className="flex gap-2 justify-center hover:bg-teal-100 rounded-lg p-2 cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                d="M20.968,18.448c-0.056,1.541-1.249,2.496-2.729,2.504c-2.153,0.012-4.307,0-6.46,0
                        c-0.645,0-0.643-1,0-1c2.199,0,4.401,0.032,6.6,0c1.107-0.016,1.589-0.848,1.589-1.838V5.647c-0.021-0.643-0.337-1.237-0.97-1.472
                        C18.662,4.05,18.291,4.08,17.937,4.08c-2.053,0-4.106,0-6.159,0l0,0c-0.645,0-0.643-1,0-1c2.224,0,4.465-0.086,6.688,0
                        c1.498,0.058,2.489,1.209,2.502,2.67V18.448z"
              />
              <path
                d="M3.176,11.663c-0.097,0.097-0.133,0.205-0.138,0.311c-0.002,0.014-0.005,0.028-0.006,0.042
                        c0.001,0.014,0.004,0.027,0.006,0.041c0.005,0.107,0.041,0.215,0.138,0.312l3.669,3.669c0.456,0.456,1.163-0.251,0.707-0.707
                        c-0.938-0.938-1.877-1.877-2.815-2.815h10.742c0.643,0,0.644-1,0-1H4.737l2.815-2.815c0.456-0.456-0.251-1.163-0.707-0.707
                        L3.176,11.663z"
              />
            </g>
          </svg>{" "}
          <p className="text-gray-700">Logout</p>
        </div>
        <br />
      </div>
    </>
  );
};

export default PrimaryLayout;
