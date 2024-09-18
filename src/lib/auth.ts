import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse } from "@/lib/types";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export const encrypt = async (payload: any) => {
  try {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10 sec from now")
      .sign(secretKey);
  } catch (error) {
    throw new Error("Your token has expired");
  }
};

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export const setAuth = async () => {
  const expires = new Date(Date.now() + 10 * 1000);
  const session = await encrypt({ expires });
  cookies().set("session", session, { expires, httpOnly: true });
};

export async function updateSession(request: NextRequest) {

  const session = request.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json<ErrorResponse>(
      {
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  console.log("Session", session);
  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
