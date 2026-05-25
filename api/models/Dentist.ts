import mongoose from 'mongoose';

export interface IDentist {
  _id: mongoose.Types.ObjectId;
  name: string;
  specialty: string;
  clinic_name: string;
  city: string;
  address: string;
  bio: string;
  rating: number;
  experience_years: number;
  consultation_fee: number;
  available_today: boolean;
  phone: string;
}

const schema = new mongoose.Schema<IDentist>(
  {
    name: { type: String, required: true },
    specialty: { type: String, default: 'Pediatric Dentist' },
    clinic_name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, default: '' },
    bio: { type: String, default: '' },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    experience_years: { type: Number, default: 5 },
    consultation_fee: { type: Number, default: 500 },
    available_today: { type: Boolean, default: false },
    phone: { type: String, default: '' },
  },
  { timestamps: true }
);

export default (mongoose.models['Dentist'] as mongoose.Model<IDentist>) ||
  mongoose.model<IDentist>('Dentist', schema);
