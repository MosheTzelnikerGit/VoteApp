"use strict";
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import User from './models/user';  // ודא שהמודל User מוגדר נכון
// import bcrypt from 'bcryptjs';
// dotenv.config();
// const seedUsers = async () => {
//   await mongoose.connect(process.env.MONGODB_URI as string);
//   // נתוני היוזרים
//   const users = [
//     {
//       username: 'user1',
//       email: 'user1@example.com',
//       password: await bcrypt.hash('password1', 10), // הצפנה של הסיסמה
//     },
//     {
//       username: 'user2',
//       email: 'user2@example.com',
//       password: await bcrypt.hash('password2', 10),
//     },
//     {
//       username: 'user3',
//       email: 'user3@example.com',
//       password: await bcrypt.hash('password3', 10),
//     },
//   ];
//   // הכנסה למסד הנתונים
//   try {
//     await User.insertMany(users);
//     console.log('Users seeded successfully');
//   } catch (error) {
//     console.error('Error seeding users:', error);
//   }
//   // סגירת החיבור למסד הנתונים
//   mongoose.connection.close();
// };
// seedUsers().catch(console.error);
