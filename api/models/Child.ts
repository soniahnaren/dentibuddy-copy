import mongoose from 'mongoose';

export interface IChild {
  _id: mongoose.Types.ObjectId;
  parent_id: mongoose.Types.ObjectId;
  name: string;
  date_of_birth: string | null;
  avatar_emoji: string;
  createdAt: Date;
}

const schema = new mongoose.Schema<IChild>(
  {
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    date_of_birth: { type: String, default: null },
    avatar_emoji: { type: String, default: '🧒' },
  },
  { timestamps: true }
);

export default (mongoose.models['Child'] as mongoose.Model<IChild>) ||
  mongoose.model<IChild>('Child', schema);
