import mongoose from 'mongoose';

export interface IChatMessage {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

const schema = new mongoose.Schema<IChatMessage>(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default (mongoose.models['ChatMessage'] as mongoose.Model<IChatMessage>) ||
  mongoose.model<IChatMessage>('ChatMessage', schema);
