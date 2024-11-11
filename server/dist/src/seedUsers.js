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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./models/user"));
dotenv_1.default.config();
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGODB_URI);
    const users = [
        {
            name: 'User 1',
            email: 'user1@example.com',
            password: 'password123', // אפשר להוסיף הצפנה אם רוצים
            isAdmin: false,
            hasVoted: false,
            votedFor: null,
        },
        {
            name: 'User 2',
            email: 'user2@example.com',
            password: 'password123',
            isAdmin: false,
            hasVoted: false,
            votedFor: null,
        },
        {
            name: 'User 3',
            email: 'user3@example.com',
            password: 'password123',
            isAdmin: true, // לדוגמה, אפשר להוסיף Admin
            hasVoted: false,
            votedFor: null,
        },
        {
            name: 'User 4',
            email: 'user4@example.com',
            password: 'password123',
            isAdmin: false,
            hasVoted: false,
            votedFor: null,
        },
    ];
    // הצפנה של סיסמאות
    const bcrypt = require('bcryptjs');
    for (const user of users) {
        user.password = yield bcrypt.hash(user.password, 10);
    }
    yield user_1.default.insertMany(users);
    console.log('Users seeded');
    mongoose_1.default.connection.close();
});
seedUsers().catch(console.error);
