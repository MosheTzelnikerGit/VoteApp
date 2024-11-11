import express from 'express';
import Candidate from '../models/Candidate';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();  // זה צריך להחזיר את כל המועמדים
    res.json(candidates);  // מחזירים את המועמדים כ-JSON
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch candidates' });
  }
});

export default router;
