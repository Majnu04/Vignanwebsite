// import mongoose from "mongoose";

// module.export const connectDB = async ()=> {
//     (await mongoose.connect('mongodb+srv://vignan:Vignan123@cluster0.ssan5dv.mongodb.net/Vignan')).then(()=>console.log("DB Connected"));
// }

// src/config/db.ts
import mongoose from "mongoose";
import path from 'path';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb+srv://vignan:Vignan123@cluster0.ssan5dv.mongodb.net/Vignan', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", (err as Error).message);
    process.exit(1);
  }
};