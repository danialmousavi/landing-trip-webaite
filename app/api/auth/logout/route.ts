import { cookies } from "next/headers";

import { SESSION_COOKIE, cookieOptions, revokeCurrentSession } from "@/lib/auth";
import { jsonError } from "@/lib/http/errors";
import { isAllowedFormOrigin } from "@/lib/http/origin";

export async function POST(request: Request) {
  if (!isAllowedFormOrigin(request)) {
    return jsonError(403, "درخواست نامعتبر است.");
  }

  await revokeCurrentSession();
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { ...cookieOptions(), maxAge: 0 });
  return Response.json({ ok: true });
}
