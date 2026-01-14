import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables")
}

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// 👇 attach to global to survive hot-reloads
declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
}

global.mongoose = cached

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "Portfolio",
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
