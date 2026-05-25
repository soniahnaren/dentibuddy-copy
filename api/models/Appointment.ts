import mongoose from 'mongoose';

export interface IAppointment {
  _id: mongoose.Types.ObjectId;
  parent_id: mongoose.Types.ObjectId;
  child_id: mongoose.Types.ObjectId;
  dentist_id: mongoose.Types.ObjectId;
  appointment_date: string;
  appointment_time: string;
  reason: string;
  status: 'confirmed' | 'cancelled';
  createdAt: Date;
}

const schema = new mongoose.Schema<IAppointment>(
  {
    parent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true },
    dentist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist', required: true },
    appointment_date: { type: String, required: true },
    appointment_time: { type: String, required: true },
    reason: { type: String, default: '' },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  },
  { timestamps: true }
);

export default (mongoose.models['Appointment'] as mongoose.Model<IAppointment>) ||
  mongoose.model<IAppointment>('Appointment', schema);
