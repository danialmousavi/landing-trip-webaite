import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { getEnv } from "@/lib/env";
import * as schema from "./schema";

type Db = ReturnType<typeof createDb>;

let client: ReturnType<typeof postgres> | undefined;
let db: Db | undefined;

function createDb() {
  const { DATABASE_URL } = getEnv();
  client = postgres(DATABASE_URL, {
    max: 10,
    prepare: false,
  });

  return drizzle(client, { schema });
}

export function getDb() {
  if (!db) {
    db = createDb();
  }

  return db;
}

export async function closeDb() {
  await client?.end({ timeout: 5 });
  client = undefined;
  db = undefined;
}
