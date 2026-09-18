import { ZodError } from "zod";

export { isTrustedOrigin as isSameOrigin } from "@/lib/http/origin";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public payload?: Record<string, unknown>,
  ) {
    super(message);
  }
}

export function fieldErrorsFromZod(error: ZodError) {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}

export function jsonError(status: number, message: string, extra?: object) {
  return Response.json({ error: message, ...extra }, { status });
}
