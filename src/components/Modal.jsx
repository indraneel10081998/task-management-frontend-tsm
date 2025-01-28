import React from "react";
import { useModal } from "../context/ModalContext";

const Modal = () => {
  const { modal } = useModal();

  return (
    <div className="fixed top-5 right-5 w-fit h-fit flex items-center justify-center">
      <div className={`px-5 py-3 shadow-lg text-white text-center rounded-lg
        ${modal.type === "success" ? "bg-teal-500" : "bg-rose-500"}`}>
        <p className="text-md font-medium">{modal.message}</p>
      </div>
    </div>
  );
};

export default Modal;