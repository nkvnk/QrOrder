"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase";
import { addBill } from "@/utils/supabaseFunction";
const MenuItemDetail = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [itemCount, setItemCount] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const fetchMenuItem = async () => {
      const { data, error } = await supabase
        .from("menus")
        .select("id, name, image, detail,price")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching menu item:", error);
      } else {
        setMenuItem(data);
      }
    };
    fetchMenuItem();
  }, [id]);

  if (!menuItem) {
    return <p>読み込み中...</p>;
  }
  const add = async () => {
    await addBill(menuItem.name, menuItem.price, itemCount);
    console.log("perfect");
    router.push("/");
  };
  return (
    <div className="relative h-screen overflow-y-auto">
      <div className="relative mt-15">
        <img
          src={menuItem.image}
          alt={menuItem.title}
          className="w-full h-64 object-cover rounded-md"
        />
        <Link href={"/"}>
          <button className="absolute top-4 right-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="mt-4 px-4 pb-24">
        <h2 className="text-2xl font-semibold">{menuItem.name}</h2>
        <p className="text-gray-500 mt-2">{menuItem.detail}</p>

        <div className="mt-4">
          <label className="block font-semibold mb-2">備考</label>
          <textarea className="border rounded-md w-full p-2" rows="3" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white px-4 py-4 shadow-md border-t">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="border p-2 rounded-md text-lg"
              onClick={() => setItemCount(itemCount > 1 ? itemCount - 1 : 1)}
            >
              −
            </button>
            <span className="mx-4 text-lg">{itemCount}</span>
            <button
              className="border p-2 rounded-md text-lg"
              onClick={() => setItemCount(itemCount + 1)}
            >
              +
            </button>
          </div>

          <button
            className="bg-orange-500 text-white px-10 py-3 rounded-md text-lg"
            onClick={add}
          >
            追加 {itemCount * menuItem.price}円
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;
