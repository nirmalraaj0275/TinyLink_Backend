import mongoose from "mongoose";

let isConnected = false; // Global connection flag

export default async function connectDB() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 15000, // 15 sec
      socketTimeoutMS: 45000,         // 45 sec
    });

    isConnected = conn.connections[0].readyState === 1;

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
