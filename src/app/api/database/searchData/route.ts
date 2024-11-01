import { NextRequest, NextResponse } from "next/server";
import getJson from "@/components/lib/getJson";
import { LibraryItem } from "@/types/database";
import path from "path";

export async function POST(req: NextRequest) {
  const body: Partial<LibraryItem> = await req.json(); // Parse the request body as partial
  let result;
  console.log(body);

  // Path to JSON file
  const jsonDir = path.join(process.cwd(), "data") + "/library.json";
  const { data } = await getJson(jsonDir);

  // Cari berdasarkan ID jika body memiliki ID
  if (body.id) {
    result = data[body.id - 1];
  }

  // Jika body memiliki nama, lakukan pencarian substring berdasarkan nama
  if (body.name) {
    const keyword = body.name.toLowerCase();
    console.log("Searching for keyword:", keyword);

    result = data.filter((item: LibraryItem) => {
      return item.name.toLowerCase().includes(keyword); // Tambahkan return
    });
  }

  console.log("Search results:", result);

  return NextResponse.json({ result }, { status: 200 });
}
