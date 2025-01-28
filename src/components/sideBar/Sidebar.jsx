import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../app/slices/loginSlice";

const Sidebar = () => {

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <h2 className="text-[64px] text-teal-900 font-extrabold lora-font text-center">
          TSM.
        </h2>
        <br />
        <div className="bg-teal-100 w-[90%] py-2 rounded-r-lg text-lg text-teal-900 text-center font-bold flex gap-2 items-center pl-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <g>
              <path d="M20.438,6.062h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z" />
              <path d="M20.438,12.5h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z" />
              <path d="M20.438,18.935h-9a.5.5,0,1,1,0-1h9a.5.5,0,0,1,0,1Z" />
              <path d="M5.562,8.062a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,5.562,8.062Zm0-4a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,5.562,4.062Z" />
              <path d="M5.562,14.5a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,5.562,14.5Zm0-4a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,5.562,10.5Z" />
              <path d="M5.562,20.938a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,5.562,20.938Zm0-4a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,5.562,16.938Z" />
            </g>
          </svg>
          <h5>My Tasks</h5>
        </div>
      </div>
      <div className="p-4">
        <hr className="border-gray-300 mb-2" />
        <div className="flex gap-2 hover:bg-teal-100 rounded-lg p-2 cursor-pointer"
        onClick={()=>dispatch(logout())}
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
    </div>
  );
};

export default Sidebar;
