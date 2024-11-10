import { LibraryItem } from "@/types/database";

type DatabaseAction = "recieveData" | "writeData" | "deleteData" | "updateData" | "selectData";

interface DatabaseData {
  name?: string;
  id?: number;
}

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "https://nanlib.vercel.app";

async function fetchData(url: string, data: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Fetch failed with status: ${response.status}`);
  }

  return response.json();
}

async function jsonDatabase(action: DatabaseAction, database: string, data?: unknown) {
  const requestData = { database, data };
  console.log(requestData);

  try {
    return await fetchData(`${BASE_API_URL}/api/database/${action}`, requestData);
  } catch (error) {
    console.error(`Error fetching from ${BASE_API_URL}:`, error);
  }
}

export const jinx = {
  select: (database: string, data?: DatabaseData) => jsonDatabase("selectData", database, data),
  // data type need to be fixed
  insert: (database: string, data: Partial<LibraryItem>) => jsonDatabase("writeData", database, data),
  update: (database: string, data: Partial<LibraryItem>) => jsonDatabase("updateData", database, data),
  delete: (database: string, data: Partial<LibraryItem>) => jsonDatabase("deleteData", database, data),
};
