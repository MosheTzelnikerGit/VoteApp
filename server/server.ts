import express from 'express';
import User from './src/models/user';
import bcrypt from 'bcryptjs';
import cors from 'cors';



const app = express();
const port = 5000;




// הוספת הגדרת CORS שמאפשרת גישה ממקור ספציפי או מכל מקור
app.use(cors({
    origin: 'http://localhost:5173', // התאם את זה לכתובת צד הלקוח שלך
    methods: 'GET,POST,PUT,DELETE', // שיטות HTTP המותרות
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


app.post("/register", async (req: any, res: any) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // בדוק אם המשתמש כבר קיים במערכת
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // צור משתמש חדש עם ערכים ברירת מחדל
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,  // ערך ברירת מחדל
        hasVoted: false, // ערך ברירת מחדל
        votedFor: null   // ערך ברירת מחדל
      });
  
      await user.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error during registration" });
    }
  });
  

  