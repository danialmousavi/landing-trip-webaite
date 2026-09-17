import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { resetEnvCache } from "@/lib/env";
import { assertSafeResume, saveResume } from "@/lib/storage/resumes";

describe("resume storage", () => {
  const previousRoot = process.env.UPLOAD_ROOT;
  const dir = mkdtempSync(path.join(tmpdir(), "resumes-"));

  afterEach(() => {
    process.env.UPLOAD_ROOT = previousRoot;
    resetEnvCache();
    rmSync(dir, { recursive: true, force: true });
  });

  it("rejects empty and mismatched files", () => {
    process.env.UPLOAD_ROOT = dir;
    resetEnvCache();
    expect(() =>
      assertSafeResume({
        buffer: Buffer.from("not-a-pdf"),
        mimeType: "application/pdf",
        originalName: "cv.pdf",
      }),
    ).toThrow();
    expect(() =>
      assertSafeResume({
        buffer: Buffer.alloc(0),
        mimeType: "application/pdf",
        originalName: "cv.pdf",
      }),
    ).toThrow();
  });

  it("stores a pdf under a generated key", async () => {
    process.env.UPLOAD_ROOT = dir;
    resetEnvCache();
    mkdirSync(dir, { recursive: true });
    const stored = await saveResume({
      buffer: Buffer.from("%PDF-1.4 sample"),
      mimeType: "application/pdf",
      originalName: "../../etc/passwd.pdf",
    });
    expect(stored.storageKey.endsWith(".pdf")).toBe(true);
    expect(stored.originalName).toBe("passwd.pdf");
    expect(stored.storageKey.includes("..")).toBe(false);
  });

  it("accepts a pdf when the browser leaves mime type empty", async () => {
    process.env.UPLOAD_ROOT = dir;
    resetEnvCache();
    mkdirSync(dir, { recursive: true });
    const stored = await saveResume({
      buffer: Buffer.from("%PDF-1.7 sample-pdf"),
      mimeType: "",
      originalName: "sample-pdf.pdf",
    });
    expect(stored.mimeType).toBe("application/pdf");
    expect(stored.originalName).toBe("sample-pdf.pdf");
  });
});
