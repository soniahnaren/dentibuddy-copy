import mongoose from 'mongoose';

export interface ITip {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  emoji: string;
  category: string;
  createdAt: Date;
}

const schema = new mongoose.Schema<ITip>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    emoji: { type: String, default: '🦷' },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export default (mongoose.models['Tip'] as mongoose.Model<ITip>) ||
  mongoose.model<ITip>('Tip', schema);
