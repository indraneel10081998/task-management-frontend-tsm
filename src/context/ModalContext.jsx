import React, { createContext, useState, useContext } from "react";
import Modal from "../components/Modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const showModal = (type, message) => {
    setModal({ isOpen: true, type, message });
    setTimeout(() => {
      setModal({ isOpen: false, type: "", message: "" });
    }, 3000);
  };

  return (
    <ModalContext.Provider value={{ modal, showModal }}>
      {children}
      {modal.isOpen && <Modal />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
