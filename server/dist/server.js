"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./src/models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000;
// הוספת הגדרת CORS שמאפשרת גישה ממקור ספציפי או מכל מקור
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173', // התאם את זה לכתובת צד הלקוח שלך
    methods: 'GET,POST,PUT,DELETE', // שיטות HTTP המותרות
    credentials: true
}));
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // בדוק אם המשתמש כבר קיים במערכת
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // צור משתמש חדש עם ערכים ברירת מחדל
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new user_1.default({
            name,
            email,
            password: hashedPassword,
            isAdmin: false, // ערך ברירת מחדל
            hasVoted: false, // ערך ברירת מחדל
            votedFor: null // ערך ברירת מחדל
        });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}));
