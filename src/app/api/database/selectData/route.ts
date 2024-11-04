import { NextRequest, NextResponse } from "next/server";
import getJson from "@/components/lib/getJson";
import { LibraryItem } from "@/types/database";
import path from "path";

export async function POST(req: NextRequest) {
  const jsonDir = path.join(process.cwd(), "data", "library.json");
  const { data } = await getJson(jsonDir);

  try {
    const body: Partial<LibraryItem> = await req.json();
    // console.log(`${body} api`)

    if (!body) {
      return NextResponse.json({ data }, { status: 200 });
    }

    const result = searchLibraryItems(data, body);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

function searchLibraryItems(
  data: LibraryItem[],
  criteria: Partial<LibraryItem>
): LibraryItem[] {
  if (criteria.id) {
    return data.filter((item) => item.id === criteria.id);
  }

  if (criteria.name) {
    const keyword = criteria.name.toLowerCase();
    console.log("Searching for keyword:", keyword);
    return data.filter((item) => item.name.toLowerCase().includes(keyword));
  }

  return [];
}
