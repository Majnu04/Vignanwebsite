"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import app from './app';
const db_1 = require("./config/db");
// import db = require('./config/db.ts');
dotenv_1.default.config();
//app config
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// db connection
(0, db_1.connectDB)();
app.get('/', (req, res) => {
    res.send('✅ Server is running, i am so glad ');
});
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on http://localhost:${PORT}`);
});
//mongodb+srv://vignan:Vignan@123@cluster0.lmg3gy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//# sourceMappingURL=server.js.map