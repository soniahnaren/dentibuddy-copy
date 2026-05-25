import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  full_name: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    full_name: { type: String, default: '' },
  },
  { timestamps: true }
);

export default (mongoose.models['User'] as mongoose.Model<IUser>) ||
  mongoose.model<IUser>('User', schema);
