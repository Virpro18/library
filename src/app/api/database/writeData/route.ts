import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { ApiItem } from "@/types/database";
import {v4 as uuidv4} from "uuid";
import { date } from "@/utility/date";
import path from "path";
import getJson from "@/components/lib/getJson";

// Define the structure of library data
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body: ApiItem = await req.json();
    console.log(body);

    // Get the path to the JSON file
    const jsonDir = path.join(process.cwd(), "data", `${body.database}.json`);

    // Read existing data from the JSON file
    const datas = await getJson(jsonDir);
    const {data} = datas

    // Generate a new ID for the new entry
    const newId = uuidv4()

    // Create a new data entry
    const newData = {
      id: newId,
      name: body.data.name || "test",
      description: body.data.description || "test",
      url: body.data.url || "kosong",
      created_at: date(),
    };
    datas.length = data.length

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
