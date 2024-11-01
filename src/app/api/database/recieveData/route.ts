import { NextResponse } from "next/server";
import getJson from "@/components/lib/getJson";
import path from "path";

export async function POST() {
  // const body = await req.json(); // Parse the request body
  // console.log(body);
  // Get the JSON file
  const jsonDir = path.join(process.cwd(), "data") + "/library.json";
  console.log({ jsonDir, path: process.cwd() });
  const { data } = await getJson(jsonDir);
  return NextResponse.json(
    { data },
    { status: 200 }
  );
}
