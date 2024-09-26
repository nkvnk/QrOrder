import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Languages = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">言語・文字サイズ</h2>
          <button onClick={closeModal}>
            <AiOutlineClose size={24} className="text-orange-500" />
          </button>
        </div>

        <div className="space-y-4">
          <button className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span>简体中文</span>
          </button>
          <button className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span>繁體中文</span>
          </button>
          <button className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span>English</span>
          </button>
          <button className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span>한국어</span>
          </button>
          <button className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span>日本語</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Languages;
