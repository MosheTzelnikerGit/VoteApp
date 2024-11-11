import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: boolean;
  hasVoted: boolean;
  votedFor: mongoose.Types.ObjectId | null;
}

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
    votedFor: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', default: null }
  });

  const User = mongoose.model('User', userSchema);

  export default User;
