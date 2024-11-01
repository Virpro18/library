// import { createClient } from "@supabase/supabase-js";
// const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const key = process.env.NEXT_PUBLIC_SUPABASE_PASS;

type database = {
  data: string;
};

// if (!url || !key) {
//   throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
// }
// export const supaBase = createClient(url, key);

// export const database = async (db: string, col: string = "") => {
//   const data = await supaBase.from(`${db}`).select(`${col}`);
//   console.log(data);
//   return data;
// };

export const jsonDatabase = async (data?: database) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000";
  const rawJson = await fetch(`${baseUrl}/api/database/recieveData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const datas = await rawJson.json();
  // console.log(datas);
  return datas;
};
