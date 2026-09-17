import { cookies } from "next/headers";

import { SESSION_COOKIE, cookieOptions, revokeCurrentSession } from "@/lib/auth";

export async function POST() {
  await revokeCurrentSession();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
  return Response.json({ ok: true });
}
