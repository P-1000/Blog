import React from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-auto">
        <div className="flex justify-between items-center pb-4 border-b">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;