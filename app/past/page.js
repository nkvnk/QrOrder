"use client";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiFileListLine } from "react-icons/ri";
import { IoLanguageSharp } from "react-icons/io5";
import { AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
export default function Menu() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h2 className="text-lg font-bold">メニュー</h2>
        <Link href={"/"}>
          <AiOutlineClose className="text-xl text-orange-500" />
        </Link>
      </header>

      <div className="p-4 space-y-4">
        <Link href={"/summary"}>
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-2">
              <RiFileListLine className="text-orange-500" size={24} />
              <span className="font-medium">注文履歴</span>
            </div>
            <AiOutlineRight className="text-gray-400" />
          </div>
        </Link>

        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <IoLanguageSharp className="text-orange-500" size={24} />
            <span className="font-medium">言語・文字サイズ</span>
          </div>
          <AiOutlineRight className="text-gray-400" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow space-y-2">
          <span className="font-medium">利用規約</span>
          <span className="font-medium">プライバシーポリシー</span>
        </div>
      </div>
    </div>
  );
}
