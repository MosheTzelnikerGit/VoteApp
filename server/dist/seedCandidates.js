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
const Candidate_1 = __importDefault(require("./models/Candidate"));
dotenv_1.default.config();
const seedCandidates = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGODB_URI);
    const candidates = [
        { name: 'Candidate 1', image: 'url1', votes: 0 },
        { name: 'Candidate 2', image: 'url2', votes: 0 },
        { name: 'Candidate 3', image: 'url3', votes: 0 },
        { name: 'Candidate 4', image: 'url4', votes: 0 },
    ];
    yield Candidate_1.default.insertMany(candidates);
    console.log('Candidates seeded');
    mongoose_1.default.connection.close();
});
seedCandidates().catch(console.error);
