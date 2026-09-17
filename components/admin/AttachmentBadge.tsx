import styles from "./Admin.module.css";

export function AttachmentBadge({
  kind,
  fileName,
}: {
  kind: "pdf" | "docx" | null;
  fileName?: string | null;
}) {
  if (!kind) {
    return <span className={styles.attachmentEmpty}>—</span>;
  }

  const label = kind === "pdf" ? "PDF" : "DOCX";
  const title = fileName ? `${fileName} (${label})` : label;

  return (
    <span className={styles.attachmentBadge} title={title} data-kind={kind}>
      {kind === "pdf" ? <PdfIcon /> : <WordIcon />}
      <span className={styles.attachmentText}>
        {label}
        {fileName ? <small>{extensionLabel(fileName)}</small> : null}
      </span>
    </span>
  );
}

function extensionLabel(fileName: string) {
  const dot = fileName.lastIndexOf(".");
  if (dot < 0) return fileName;
  return fileName.slice(dot).toLowerCase();
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="#E24C4B"
        d="M6 2h8.2L20 7.8V22a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      />
      <path fill="#fff" opacity="0.35" d="M14 2v6h6" />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="800"
        fill="#fff"
        fontFamily="Tahoma, sans-serif"
      >
        PDF
      </text>
    </svg>
  );
}

function WordIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="#2B579A"
        d="M6 2h8.2L20 7.8V22a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      />
      <path fill="#fff" opacity="0.35" d="M14 2v6h6" />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="800"
        fill="#fff"
        fontFamily="Tahoma, sans-serif"
      >
        W
      </text>
    </svg>
  );
}
