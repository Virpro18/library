import { NextRequest, NextResponse } from "next/server";
import getJson from "@/components/lib/getJson";
import { LibraryItem, ApiItem } from "@/types/database";
import path from "path";

export async function POST(req: NextRequest) {
  const body: Partial<ApiItem> = await req.json();
  const jsonDir = path.join(process.cwd(), "data", `${body.database}.json`);
  const { data } = await getJson(jsonDir);

  if (!body.data) {
    return NextResponse.json({ data }, { status: 200 });
  }

  const result = searchLibraryItems(data, body.data);
  return NextResponse.json(result, { status: 200 });
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
