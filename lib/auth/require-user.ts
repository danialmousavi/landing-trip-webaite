import { redirect } from "next/navigation";

import { readSessionUser, type AuthUser } from "./session";

export async function requireUser(returnTo = "/admin"): Promise<AuthUser> {
  const user = await readSessionUser();
  if (user) return user;

  const safeReturnTo = returnTo.startsWith("/admin") ? returnTo : "/admin";
  redirect(`/admin/login?returnTo=${encodeURIComponent(safeReturnTo)}`);
}
