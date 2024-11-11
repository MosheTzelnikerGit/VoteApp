import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) : Promise<void> => {
  const { username, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error });
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid username or password' });
      
    }

    const token = jwt.sign({ userId: user._id , isAdmin: user.isAdmin}, 'secret-key', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', user, token });
    
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
    
  }
});

export default router;