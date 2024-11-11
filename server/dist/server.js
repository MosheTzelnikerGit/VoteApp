"use strict";
// import express from 'express';
// import cors from 'cors'; // אם אתה צריך CORS
// import dotenv from 'dotenv'; // אם אתה רוצה להשתמש במשתנים מתוך קובץ .env
// import mongoose from 'mongoose';
// import authRoutes from './routes/authRoutes';
// dotenv.config();
// const app = express(); // יצירת אינסטנס של Express
// // חיבור למסד נתונים (MongoDB לדוגמה)
// mongoose.connect(process.env.MONGO_URI as string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.log('Error connecting to MongoDB:', error));
// // הגדרת תצורת השרת
// app.use(express.json()); // מאפשר לשרת לקרוא בקשות JSON
// app.use(cors()); // אם יש צורך ב-CORS
// // הגדרת מסלולים
// app.use('/api/auth', authRoutes); // כל הבקשות ב-/api/auth יגיעו לauthRoutes
// // הגדרת מסלול ברירת מחדל
// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });
// // שמיעת בקשות בפורט 5000 (או הפורט שמוגדר בסביבה)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
