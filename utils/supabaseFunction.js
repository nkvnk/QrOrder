import { supabase } from "./supabase";

export const getMenu = async () => {
  const { data, error } = await supabase
    .from("menus")
    .select("id, name, image, detail,price");
  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
  console.log("取得したデータ:", data);
  return data;
};

export const getBill = async () => {
  const { data, error } = await supabase
    .from("A")
    .select("id,  menu, price, count ");
  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
  console.log("取得したデータ:", data);
  return data;
};

export const addBill = async (name, price, count) => {
  const { data, error } = await supabase.from("A").insert({
    menu: name,
    price: price,
    count: count,
  });
};
