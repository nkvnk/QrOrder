"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { MdRestaurant } from "react-icons/md";

import { useRouter } from "next/navigation";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("A")
        .select("id,menu,price,count");
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        const initialQuantities = data.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantities);
        setItems(data);
      }
    };

    fetchData();
  }, []);

  const increment = (id) => {
    setQuantity((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decrement = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 0),
    }));
  };

  const getTotalAmount = () =>
    items.reduce(
      (total, item) => total + item.price * (quantity[item.id] || 0),
      0
    );

  {
    /* const getTotalCount = () =>
    items.reduce((total, item) => total + (quantity[item.id] || 0), 0);
*/
  }
  const saveCartToAF = async () => {
    const itemsToSave = items.map((item) => ({
      id: item.id,
      menu: item.menu,
      price: item.price,
      count: quantity[item.id] || 0,
    }));

    const { error } = await supabase
      .from("AF")
      .upsert(itemsToSave, { onConflict: ["id"] });

    if (error) {
      console.error("Supabaseへの保存エラー:", error);
    }
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm(
      "カート内のすべてのアイテムを削除してもよろしいですか？"
    );
    if (!confirmDelete) return;

    const { data: allItems, error: fetchError } = await supabase
      .from("A")
      .select("id");

    if (fetchError) {
      console.error("データ取得エラー:", fetchError);
      return;
    }

    const { error: deleteError } = await supabase
      .from("A")
      .delete()
      .in(
        "id",
        allItems.map((item) => item.id)
      );

    if (deleteError) {
      console.error("Supabaseからの削除エラー:", deleteError);
    } else {
      // ステートをクリア
      setItems([]);
      setQuantity({});
      router.push("/"); // リロードせずにページ遷移
    }
  };

  const finish = async () => {
    const confirmOrder = window.confirm("注文が完了しました");
    if (!confirmOrder) return;

    await saveCartToAF();
    const { data: allItems, error: fetchError } = await supabase
      .from("A")
      .select("id");

    if (fetchError) {
      console.error("データ取得エラー:", fetchError);
      return;
    }

    const { error: deleteError } = await supabase
      .from("A")
      .delete()
      .in(
        "id",
        allItems.map((item) => item.id)
      );

    if (deleteError) {
      console.error("Supabaseからの削除エラー:", deleteError);
    } else {
      setItems([]);
      setQuantity({});
      router.push("/");
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col mt-10">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">カート</h1>
        <button className="text-orange-600 text-xl" onClick={handleDeleteAll}>
          ✖
        </button>
      </div>

      <div className="flex items-center p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.2)] mt-3 w-[90%] mx-auto rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="p-2 mr-5 rounded-full bg-orange-100">
            <MdRestaurant size={30} className="text-orange-600" />
          </div>
          <p className="text-xl font-bold px-2 pt-1">テーブル A22</p>
        </div>
      </div>

      <div className="p-4 mt-5">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decrement(item.id)}
                className="bg-orange-100 text-orange-600 w-8 h-8 text-xl font-bold flex items-center justify-center"
              >
                －
              </button>
              <span className="text-lg text-orange-600 font-bold">
                {quantity[item.id] || 0}
              </span>
              <button
                onClick={() => increment(item.id)}
                className="bg-orange-100 text-orange-600 w-8 h-8 text-xl flex items-center justify-center"
              >
                ＋
              </button>
            </div>
            <div className="flex-grow px-4">
              <p className="text-lg font-bold">{item.menu}</p>
              <p className="text-lg font-semibold">{item.description}</p>
            </div>
            <p className="text-lg font-semibold">
              {item.price * (quantity[item.id] || 0)} 円
            </p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 w-full bg-white">
        <div className="flex justify-between items-center p-4 border-t">
          <p className="text-lg font-bold">小計</p>
          <p className="text-lg font-semibold">{getTotalAmount()}円</p>
        </div>
        <div className="p-4">
          <button
            className="bg-orange-500 text-white w-full py-3 rounded-lg text-lg font-bold"
            onClick={finish}
          >
            注文
          </button>
        </div>
      </div>
    </div>
  );
}
