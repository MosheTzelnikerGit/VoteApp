import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // חיבור למסד הנתונים - ללא שימוש ב-useNewUrlParser ו-useUnifiedTopology
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // יציאה אם החיבור נכשל
  }
};

export default connectDB;
