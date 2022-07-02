import mongoose from "mongoose";

async function dbConnect() {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "resume",
    });
  }
}

export default dbConnect;
