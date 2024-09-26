"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default function OrderSummary() {
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchOrderData = async () => {
      const { data, error } = await supabase
        .from("AF")
        .select("id,menu,price,count");

      if (error) {
        console.error("Error fetching order data:", error);
      } else {
        setOrderItems(data);

        const total = data.reduce(
          (sum, item) => sum + item.price * item.count,
          0
        );
        setTotalAmount(total);
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900">現在注文済み</h1>
        <Link href={"/"}>
          <h2 className="text-orange-500 cursor-pointer font-extrabold">
            戻る
          </h2>
        </Link>
      </header>

      <div className="bg-white p-4 mt-4 mx-2 rounded-lg shadow-md">
        <h2 className="text-gray-700 font-semibold">お客様への通知</h2>
      </div>

      <div className="bg-white p-4 mt-4 mx-2 rounded-lg shadow-md">
        {orderItems.length === 0 ? (
          <p className="text-gray-500">注文がありません。</p>
        ) : (
          orderItems.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">
                  {item.count}x {item.menu}
                </span>
                <span className="text-gray-600">{`${item.price}円`}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-4 mt-4 mx-2 rounded-lg shadow-md fixed bottom-10">
        <div className="flex justify-between font-semibold text-lg ">
          <span>合計: {totalAmount}円</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          これは最終請求書ではありません。追加料金が適用される場合があります。ご不明な点がございましたら、サーバーにお問い合わせください。
        </p>
      </div>
    </div>
  );
}
