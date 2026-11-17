import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27018/?directConnection=true";
async function connect() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 500 });
  try { await client.connect(); return client; }
  catch { await client.close(); return null; }
}
let client = await connect();
let child;
if (!client) {
  const path = resolve(".data/mongodb");
  mkdirSync(path, { recursive: true, mode: 0o700 });
  child = spawn("mongod", ["--dbpath", path, "--port", "27018", "--bind_ip", "127.0.0.1", "--replSet", "ebf-local", "--logpath", resolve(path, "server.log")], { stdio: "inherit" });
  child.on("error", () => { console.error("Install MongoDB Community (mongod), then run npm run db:local again."); process.exitCode = 1; });
  for (let i = 0; i < 20 && !client; i++) { await delay(500); client = await connect(); }
  if (!client) { child.kill("SIGTERM"); throw new Error("Local MongoDB did not start. Check .data/mongodb/server.log."); }
}
try {
  const hello = await client.db("admin").command({ hello: 1 });
  if (hello.setName && hello.setName !== "ebf-local") throw new Error("Port 27018 belongs to another replica set. It was not changed.");
  if (!hello.setName) {
    // Only initialize the process started by this script.
    if (!child) throw new Error("An existing MongoDB uses port 27018. It was not changed.");
    await client.db("admin").command({ replSetInitiate: { _id: "ebf-local", members: [{ _id: 0, host: "127.0.0.1:27018" }] } });
  }
  let ready = false;
  for (let i = 0; i < 30; i++) { if ((await client.db("admin").command({ hello: 1 })).isWritablePrimary) { ready = true; break; } await delay(500); }
  if (!ready) throw new Error("Replica set has no primary yet. Check the MongoDB log.");
  console.log("Local MongoDB ready on 127.0.0.1:27018. Run npm run dev in another terminal.");
} catch (error) { child?.kill("SIGTERM"); throw error; }
finally { await client.close(); }
if (child) for (const event of ["SIGINT", "SIGTERM"]) process.once(event, () => child.kill("SIGTERM"));
