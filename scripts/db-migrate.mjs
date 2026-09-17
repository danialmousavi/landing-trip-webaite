import { readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const drizzleDir = path.join(projectRoot, "drizzle");

const entries = await readdir(drizzleDir, { withFileTypes: true }).catch(() => []);
const sqlMigrations = entries.filter(
  (entry) => entry.isFile() && entry.name.endsWith(".sql"),
);

if (sqlMigrations.length === 0) {
  console.log("No SQL migrations yet; skipping drizzle-kit migrate.");
  process.exit(0);
}

const result = spawnSync("npx", ["drizzle-kit", "migrate"], {
  cwd: projectRoot,
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
