import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { cookies } from "next/headers";
import { AdminData } from "@/types/database";
import getJson from "@/components/lib/getJson";

export const POST = async (req: NextRequest) => {
  // return NextResponse.json({res:"succes"},{status:200})
  const cookieStore = cookies();
  const jsonDir = path.join(process.cwd(), "data", `admin.json`);
  const { data } = await getJson(jsonDir);

  const body: AdminData = await req.json();
  const { username, password, email } = body;
  // return NextResponse.json({data, username, password}, { status: 200 });
  const result = data.find(
    (item) =>
      (item.username === username && item.password === password) ||
      (item.email === email && item.password === password)
  );
  if (!result) {
    return NextResponse.json({ res: "failed"}, { status: 401 });
  }
  cookieStore.set("admin", `${result.name}`, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60,
  })
  return NextResponse.json({status:"succes"}, { status: 200 });
};
