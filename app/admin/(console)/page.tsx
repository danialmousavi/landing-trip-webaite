import Link from "next/link";

import styles from "@/components/admin/Admin.module.css";
import {
  submissionStatusLabels,
  submissionTypeLabels,
  submissionStatuses,
  submissionTypes,
} from "@/lib/forms";
import { listSubmissions } from "@/lib/submissions/service";

export const dynamic = "force-dynamic";

export default async function AdminInboxPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;
  const status = typeof params.status === "string" ? params.status : undefined;
  const query = typeof params.q === "string" ? params.q : undefined;

  const { items } = await listSubmissions({
    type: submissionTypes.includes(type as never) ? (type as never) : undefined,
    status: submissionStatuses.includes(status as never)
      ? (status as never)
      : undefined,
    query,
  });

  return (
    <>
      <h1>درخواست‌های دریافتی</h1>
      <form className={styles.filters}>
        <select name="type" defaultValue={type ?? ""}>
          <option value="">همه انواع</option>
          {submissionTypes.map((value) => (
            <option key={value} value={value}>
              {submissionTypeLabels[value]}
            </option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? ""}>
          <option value="">همه وضعیت‌ها</option>
          {submissionStatuses.map((value) => (
            <option key={value} value={value}>
              {submissionStatusLabels[value]}
            </option>
          ))}
        </select>
        <input name="q" defaultValue={query ?? ""} placeholder="جستجو نام، موبایل یا ایمیل" />
        <button className="button button-brand" type="submit">
          فیلتر
        </button>
      </form>

      {items.length === 0 ? (
        <div className={styles.empty}>هنوز درخواستی ثبت نشده است.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>نوع</th>
                <th>نام</th>
                <th>تماس</th>
                <th>وضعیت</th>
                <th>تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{submissionTypeLabels[item.type]}</td>
                  <td>
                    <Link href={`/admin/submissions/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>{item.phone}</td>
                  <td>
                    <span className={styles.badge}>
                      {submissionStatusLabels[item.status]}
                    </span>
                  </td>
                  <td>
                    {item.createdAt.toLocaleDateString("fa-IR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
