import mongoose from "mongoose";

async function dbConnect() {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
  }
}

export default dbConnect;
