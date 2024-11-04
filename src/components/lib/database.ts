// ... existing code ...

type DatabaseAction =
  | "recieveData"
  | "writeData"
  | "deleteData"
  | "updateData"
  | "selectData";
type DatabaseData = {
  name?: string;
  id?:number;
};
interface TargetItem {
  name: string;
  description: string;
  url: string;
  targetedData?: string | number;
}
const jsonDatabase = async (action: DatabaseAction, data?: unknown) => {
  console.log(data);
  console.log(action);

  // Definisikan URL utama dan fallback
  const urls = [
    process.env.NEXT_PUBLIC_BASE_API_URL,
    "http://localhost:3000",
  ].filter(Boolean); // Menghapus nilai undefined jika variabel env tidak diatur

  // Fungsi pembantu untuk melakukan fetch
  const fetchData = async (url: string|undefined) => {
    const response = await fetch(`${url}/api/database/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok)
      throw new Error(`Fetch failed with status: ${response.status}`);
    return response.json();
  };

  // Coba fetch dengan URL utama, lalu fallback jika gagal
  for (const url of urls) {
    try {
      return await fetchData(url);
    } catch {
      console.error(`Error fetching from ${url}:`);
    }
  }

  // Mengembalikan pesan error jika semua percobaan gagal
  return "error";
};

export const jinx = {
  select: (data?: DatabaseData) => jsonDatabase("selectData", data),
  insert: (data: TargetItem) => jsonDatabase("writeData", data),
  update: (data: TargetItem) => jsonDatabase("updateData", data),
  delete: (data: TargetItem) => jsonDatabase("deleteData", data),
  search: (data: TargetItem) => jsonDatabase("selectData", data),
};
