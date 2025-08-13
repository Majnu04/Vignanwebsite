"use strict";
// import mongoose from "mongoose";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
// module.export const connectDB = async ()=> {
//     (await mongoose.connect('mongodb+srv://vignan:Vignan123@cluster0.ssan5dv.mongodb.net/Vignan')).then(()=>console.log("DB Connected"));
// }
// src/config/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect('mongodb+srv://vignan:Vignan123@cluster0.ssan5dv.mongodb.net/Vignan');
        console.log("✅ DB Connected");
    }
    catch (err) {
        console.error("❌ DB Connection Error:", err.message);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map