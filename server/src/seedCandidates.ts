import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Candidate from './models/Candidate';

dotenv.config();

const seedCandidates = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);

  const candidates = [
    { name: 'Candidate 1', image: 'url1', votes: 0 },
    { name: 'Candidate 2', image: 'url2', votes: 0 },
    { name: 'Candidate 3', image: 'url3', votes: 0 },
    { name: 'Candidate 4', image: 'url4', votes: 0 },
  ];

  await Candidate.insertMany(candidates);
  console.log('Candidates seeded');
  mongoose.connection.close();
};

seedCandidates().catch(console.error);
