import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password, isAdmin } = req.body;
  // בדיקות ואימות
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // התחברות ואימות עם JWT
});

export default router;
