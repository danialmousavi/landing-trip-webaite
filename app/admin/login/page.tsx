import { Suspense } from "react";
import { redirect } from "next/navigation";

import LoginForm from "@/components/admin/LoginForm";
import styles from "@/components/admin/Admin.module.css";
import { readSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const user = await readSessionUser();
  if (user) redirect("/admin");

  return (
    <div className={styles.loginWrap}>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
