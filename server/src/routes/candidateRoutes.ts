import express from 'express';
import Candidate from '../models/Candidate';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'default_fallback_secret';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch candidates', error });
  }
});

router.put('/:id/vote', async (req: Request, res: Response): Promise<void> => {
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
      decoded = jwt.verify(tokenValue, secret);
    } catch (error) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    if (typeof decoded !== 'object' || !decoded.userId) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.hasVoted) {
      res.status(403).json({ message: 'User has already voted' });
      return;
    }

    const candidateId = req.params.id;
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      res.status(404).json({ message: 'Candidate not found' });
      return;
    }

    candidate.votes += 1;
    user.hasVoted = true;
    user.votedFor = candidate._id as mongoose.Types.ObjectId;

    try {
      await candidate.save();
    } catch (error) {
      res.status(500).json({ message: 'Failed to update candidate', error });
      return;
    }

    try {
      await user.save();
    } catch (error) {
      res.status(500).json({ message: 'Failed to update user', error });
      return;
    }

    res.json({ message: 'Vote recorded successfully', candidate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record vote', error: 'Failed to record vote' });
  }
});

export default router;
