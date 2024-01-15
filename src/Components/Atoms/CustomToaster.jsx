import React from "react";

const CustomToaster = ({ message, onClose }) => {
  return (
    <div
      className={` left-1/2 transform -translate-x-1/2 bg-gray-200 text-black font-medium px-4 py-2 rounded-md`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          className="ml-4 font-bold text-lg"
          onClick={() => {
            onClose();
          }}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default CustomToaster;
