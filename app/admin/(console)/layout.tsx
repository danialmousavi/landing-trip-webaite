import Link from "next/link";

import LogoutButton from "@/components/admin/LogoutButton";
import styles from "@/components/admin/Admin.module.css";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser("/admin");

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/admin">صندوق درخواست‌های دات‌وان تریپ</Link>
        <span>
          {user.username} · {user.role === "admin" ? "مدیر" : "اپراتور"}
        </span>
        <LogoutButton />
      </header>
      <div className={styles.shell}>{children}</div>
    </div>
  );
}
