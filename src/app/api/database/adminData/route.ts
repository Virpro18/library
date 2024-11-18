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
    maxAge: 60 * 60 * 24,
  })
  return NextResponse.json({status:"succes"}, { status: 200 });
};


export async function GET() {
  // Menghapus cookie token
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("admin", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Mengatur cookie kadaluarsa
    path: "/",
  });

  return response;
}


/*
TODO:
- [X] Add password,username,email,lore to cookie
- [X] Add lore to database
- [X] fix the fucking API Type/Interface
*/