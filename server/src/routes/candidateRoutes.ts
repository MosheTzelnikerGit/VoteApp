import express from 'express';
import Candidate from '../models/Candidate';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find(); 
    res.json(candidates); 
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
});

export default router;
