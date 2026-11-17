import { MongoClient } from "mongodb";

export const collections = ["donations", "enquiries", "outbox", "payment_events", "admin_sessions", "metrics"];

export async function openDatabase(uri, name = "ekatvabharat") {
  if (!uri) throw new Error("MONGODB_URI is required. Configure a MongoDB replica set or Atlas cluster.");
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000, maxPoolSize: 10 });
  try {
    await client.connect();
    const database = client.db(name);
    const hello = await database.admin().command({ hello: 1 });
    if (!hello.setName && hello.msg !== "isdbgrid") throw new Error("MongoDB must support transactions. Use Atlas or a replica set.");
    for (const table of collections) {
      const key = table === "admin_sessions" ? "token_hash" : table === "metrics" ? "name" : "id";
      await database.collection(table).createIndex({ [key]: 1 }, { unique: true });
    }
    for (const table of ["donations", "enquiries"]) {
      await database.collection(table).createIndex({ request_key: 1 }, { unique: true });
      await database.collection(table).createIndex({ created_at: -1, id: -1 });
    }
    for (const key of ["order_id", "payment_id", "receipt_number"]) {
      await database.collection("donations").createIndex({ [key]: 1 }, { unique: true, partialFilterExpression: { [key]: { $type: "string" } } });
    }
    await database.collection("donations").createIndex({ status: 1, mode: 1, updated_at: 1 });
    await database.collection("outbox").createIndex({ status: 1, next_attempt: 1, created_at: 1 });
    await database.collection("admin_sessions").createIndex({ expires_at: 1 });
    function store(session) {
      const options = session ? { session } : {};
      return {
        findOne: (table, filter = {}) => database.collection(table).findOne(filter, { ...options, projection: { _id: 0 } }),
        insert: (table, document) => database.collection(table).insertOne({ ...document }, options),
        update: (table, filter, update, extra = {}) => database.collection(table).updateOne(filter, update, { ...extra, ...options }),
        remove: (table, filter) => database.collection(table).deleteMany(filter, options),
        count: (table, filter = {}) => database.collection(table).countDocuments(filter, options),
        list: (table, filter = {}, { sort = { created_at: -1, id: -1 }, skip = 0, limit = 50, projection = { _id: 0 } } = {}) => database.collection(table).find(filter, { ...options, projection }).sort(sort).skip(skip).limit(limit).toArray(),
        aggregate: (table, pipeline) => database.collection(table).aggregate(pipeline, options).toArray(),
        ping: () => database.command({ ping: 1 }),
        transaction: async (operation) => {
          const transactionSession = client.startSession();
          try { return await transactionSession.withTransaction(() => operation(store(transactionSession)), { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } }); }
          finally { await transactionSession.endSession(); }
        },
        close: () => client.close(),
      };
    }
    return store();
  } catch (error) { await client.close(); throw error; }
}
