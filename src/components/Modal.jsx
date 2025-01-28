import React from "react";
import { useModal } from "../context/ModalContext";

const Modal = () => {
  const { modal } = useModal();

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className={`p-5 shadow-lg text-white text-center 
        ${modal.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
        <p className="text-lg font-semibold">{modal.message}</p>
      </div>
    </div>
  );
};

export default Modal;
