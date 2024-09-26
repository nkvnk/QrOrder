"use client";
import { useState, useEffect } from "react";
import { LiaLanguageSolid } from "react-icons/lia";
import { LuMenuSquare } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
import Language from "../components/Languages";
import Link from "next/link";
import SideBar from "../components/SideBar";
import { getMenu, getBill } from "../utils/supabaseFunction";
import { BsCart4 } from "react-icons/bs";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [items, setItems] = useState([]);
  const [check, setCheck] = useState([]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const addToCart = () => {
    setShowAddedModal(true);
    setTimeout(() => {
      setShowAddedModal(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMenu();
      setItems(data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchBill = async () => {
      const bill = await getBill();
      setCheck(bill || []);
      console.log("確認しますか", bill);
    };
    fetchBill();
  }, []);

  const totalCount = check.reduce((total, item) => total + item.count, 0);
  const totalAmount = check.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  return (
    <div className="relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between z-50">
        {/* Menu Icon */}
        <button className="text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-orange-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Center Title */}
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="flex space-x-1">
              <h1 className="text-lg font-bold">Mobile Order</h1>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 items-center">
          <Link href="/summary">
            <LuMenuSquare className="text-orange-400 w-5 h-5" />
          </Link>
          <button onClick={openModal}>
            <LiaLanguageSolid className="text-orange-400 w-5 h-5" />
          </button>
          <Link href={"/past"}>
            <IoMdPerson className="text-orange-400 w-5 h-5" />
          </Link>
        </div>
      </header>

      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="p-4 pt-20">
        <div className="bg-yellow-100 p-4 rounded-md shadow-md">
          <h2 className="font-bold text-gray-700">お客様への通知</h2>
          <p>メニュー参照→カートに入れて→注文</p>
        </div>

        <div className="mt-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Link href={`/detail/${item.id}`} key={item.id}>
                <div
                  onClick={addToCart}
                  className="bg-white p-4 shadow-md rounded-md flex justify-between mb-4 cursor-pointer"
                >
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p>{item.price}円</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md"
                  />
                </div>
              </Link>
            ))
          ) : (
            <p>loading</p>
          )}
        </div>
        <Link href={"/bill"}>
          {check.length > 0 && (
            <div className="fixed bottom-20 left-0 right-0 p-4 bg-gray-400 text-white flex justify-between items-center z-50 rounded-3xl">
              商品をカートに追加されました
            </div>
          )}

          {check.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-orange-500 text-white flex justify-between items-center z-50 rounded-lg border-white border-4">
              <div className="flex items-center">
                <BsCart4 size={24} />
                <span className="font-bold">合計：{totalCount}個</span>
              </div>
              <span className="font-bold">{totalAmount}円</span>
            </div>
          )}
        </Link>
        {showModal && <Language closeModal={closeModal} />}
      </main>
    </div>
  );
}
