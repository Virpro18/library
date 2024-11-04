import { NextRequest, NextResponse } from "next/server";
import getJson from "@/components/lib/getJson";
import { LibraryItem } from "@/types/database";
import path from "path";

export async function POST(req: NextRequest) {
  const jsonDir = path.join(process.cwd(), "data", "library.json");
  const { data } = await getJson(jsonDir);
  try {
    const body: Partial<LibraryItem> = await req.json();

    if (!body) {
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }

    let result;
    console.log(body);


    if (body.id) {
      result = data.find((item) => item.id === body.id);
    }

    if (body.name) {
      const keyword = body.name.toLowerCase();
      console.log("Searching for keyword:", keyword);

      result = data.filter((item) => item.name.toLowerCase().includes(keyword));
    }

    console.log("Search results:", result);

    return NextResponse.json({ result }, { status: 200 });
  } catch {
    return NextResponse.json({ data }, { status: 200 });
  }
}
