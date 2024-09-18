import { NextResponse, type NextRequest } from "next/server";
// import { updateSession } from "@/lib/auth";
import { ErrorResponse } from "@/lib/types";
import validate from "@/lib/validation";

export const middleware = async (request: NextRequest) => {
  try {
    await validate(request);
  } catch (err) {
    return NextResponse.json<ErrorResponse>({ error: `Validation ${err}` }, { status: 404 })
  } 
};

export const config = {
  matcher: "/api/:path*",
};