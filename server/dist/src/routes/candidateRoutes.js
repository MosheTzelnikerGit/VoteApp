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
const Candidate_1 = __importDefault(require("../models/Candidate"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || 'default_fallback_secret';
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield Candidate_1.default.find();
        res.json(candidates);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch candidates', error });
    }
}));
router.put('/:id/vote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: 'Authorization token is missing' });
            return;
        }
        const tokenValue = token.split(' ')[1];
        if (!tokenValue) {
            res.status(400).json({ message: 'Token is malformed' });
            return;
        }
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(tokenValue, secret);
        }
        catch (error) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        if (typeof decoded !== 'object' || !decoded.userId) {
            res.status(403).json({ message: 'Invalid token' });
            return;
        }
        const user = yield user_1.default.findById(decoded.userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.hasVoted) {
            res.status(403).json({ message: 'User has already voted' });
            return;
        }
        const candidateId = req.params.id;
        const candidate = yield Candidate_1.default.findById(candidateId);
        if (!candidate) {
            res.status(404).json({ message: 'Candidate not found' });
            return;
        }
        candidate.votes += 1;
        user.hasVoted = true;
        user.votedFor = candidate._id;
        try {
            yield candidate.save();
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to update candidate', error });
            return;
        }
        try {
            yield user.save();
        }
        catch (error) {
            res.status(500).json({ message: 'Failed to update user', error });
            return;
        }
        res.json({ message: 'Vote recorded successfully', candidate });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to record vote', error: 'Failed to record vote' });
    }
}));
exports.default = router;
