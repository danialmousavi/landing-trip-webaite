"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  submissionStatusLabels,
  submissionStatuses,
  type SubmissionStatus,
} from "@/lib/forms";
import styles from "./Admin.module.css";

export default function StatusActions({
  id,
  status,
}: {
  id: string;
  status: SubmissionStatus;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  return (
    <div>
      <div className={styles.statusRow}>
        {submissionStatuses.map((value) => (
          <button
            key={value}
            type="button"
            className="button button-dark"
            disabled={pending || value === status}
            onClick={async () => {
              setPending(true);
              setError("");
              const response = await fetch(`/api/admin/submissions/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: value }),
              });
              setPending(false);
              if (!response.ok) {
                setError("به‌روزرسانی وضعیت انجام نشد.");
                return;
              }
              router.refresh();
            }}
          >
            {submissionStatusLabels[value]}
          </button>
        ))}
      </div>
      {error ? <p style={{ color: "#b42318" }}>{error}</p> : null}
    </div>
  );
}
