// One-time, non-destructive import. SQLite remains untouched for rollback.
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { openDatabase } from "../server/database.mjs";
const source = resolve(process.argv[2] || ".data/ebf.sqlite");
if (!existsSync(source)) throw new Error("SQLite source does not exist.");
const sqlite = new DatabaseSync(source, { readOnly: true });
let mongo;
try {
  mongo = await openDatabase(process.env.MONGODB_URI, process.env.MONGODB_DB_NAME || "ekatvabharat");
  // Sessions are intentionally excluded: administrators sign in again after migration.
  sqlite.exec("BEGIN");
  const tables = ["donations", "enquiries", "payment_events", "outbox", "metrics"];
  const counts = await mongo.transaction(async (tx) => {
    const result = {};
    for (const table of tables) {
      const rows = sqlite.prepare(`SELECT * FROM ${table}`).all();
      const key = table === "metrics" ? "name" : "id";
      let added = 0;
      for (const row of rows) {
        if (await tx.findOne(table, { [key]: row[key] })) continue;
        await tx.insert(table, row);
        added++;
      }
      result[table] = { source: rows.length, imported: added };
    }
    return result;
  });
  console.log(JSON.stringify(counts, null, 2));
  console.log("Import complete. Source SQLite was not modified. Existing MongoDB records were not overwritten.");
} finally { try { sqlite.exec("ROLLBACK"); } catch {} sqlite.close(); await mongo?.close(); }
