import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/data/db';
import authRoutes from './src/routes/authRoutes';
import candidateRoutes from './src/routes/candidateRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();


app.use('/api/', authRoutes);
app.use('/api/candidates', candidateRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});