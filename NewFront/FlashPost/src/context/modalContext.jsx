import React, { createContext, useState, useContext } from "react";
import Modal from "../Components/Utils/Modal";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const openModal = (content, title = "") => {
    setModalContent(content);
    setModalTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};