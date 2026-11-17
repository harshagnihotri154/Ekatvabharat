import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
let env = existsSync(".env")
  ? readFileSync(".env", "utf8")
  : readFileSync(".env.example", "utf8");
if (/^ADMIN_TOKEN=.+$/m.test(env)) {
  console.log("ADMIN_TOKEN is already set in .env. No changes made.");
  process.exit(0);
}
const token = randomBytes(32).toString("hex");
env = /^ADMIN_TOKEN=/m.test(env)
  ? env.replace(/^ADMIN_TOKEN=.*$/m, `ADMIN_TOKEN=${token}`)
  : env + `\nADMIN_TOKEN=${token}\n`;
writeFileSync(".env", env, { mode: 0o600 });
console.log(
  "Admin access token created in ignored .env. Restart the API, then use the token at /admin.",
);
