import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { date } from "@/utility/date";
import path from "path";
import getJson from "@/components/lib/getJson";

// Define the structure of library data
type LibData = {
  name: string;
  description: string;
  url: string;
};

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: LibData = await req.json();
    console.log(body);

    // Get the path to the JSON file
    const jsonDir = path.join(process.cwd(), "data", "library.json");

    // Read existing data from the JSON file
    const datas = await getJson(jsonDir);
    const {data} = datas
    let {length} = datas

    // Generate a new ID for the new entry
    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;

    // Create a new data entry
    const newData = {
      id: newId,
      name: body.name || "test",
      description: body.description || "test",
      url: body.url || "kosong",
      created_at: date(),
    };
    length = data.length

    // Add the new data to the existing data array
    data.push(newData);

    // Write the updated data back to the JSON file
    await fs.writeFile(jsonDir, JSON.stringify({ length,data }, null, 2), "utf-8");

    // Return a success response
    return NextResponse.json({ message: "Data added successfully", data });
  } catch (error) {
    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "An error occurred", details: error },
      { status: 500 }
    );
  }
}
