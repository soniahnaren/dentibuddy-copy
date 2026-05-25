import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from './lib/mongodb.js';
import { setCors } from './lib/cors.js';
import Dentist from './models/Dentist.js';
import Tip from './models/Tip.js';

const DENTISTS = [
  { name: 'Dr. Priya Sharma', specialty: 'Pediatric Dentist', clinic_name: 'SmileCare Kids', city: 'Mumbai', address: '12 Marine Drive, Mumbai', bio: 'Dr. Sharma has 12 years of experience specializing in pediatric dentistry. She creates a fun, comfortable environment for children.', rating: 4.9, experience_years: 12, consultation_fee: 800, available_today: true, phone: '+91-9876543210' },
  { name: 'Dr. Arjun Mehta', specialty: 'Pediatric & Preventive Dentist', clinic_name: 'Happy Teeth Clinic', city: 'Delhi', address: '45 Connaught Place, New Delhi', bio: 'Dr. Mehta focuses on preventive care and early intervention to ensure children maintain healthy smiles for life.', rating: 4.8, experience_years: 10, consultation_fee: 700, available_today: true, phone: '+91-9876543211' },
  { name: 'Dr. Sunita Rao', specialty: 'Pediatric Orthodontist', clinic_name: 'BrightSmile Center', city: 'Bangalore', address: '78 MG Road, Bangalore', bio: 'Dr. Rao specializes in early orthodontic treatment for children, helping guide proper jaw and teeth development.', rating: 4.7, experience_years: 15, consultation_fee: 1000, available_today: false, phone: '+91-9876543212' },
  { name: 'Dr. Kavya Nair', specialty: 'Pediatric Dentist', clinic_name: 'Kids Dental Hub', city: 'Chennai', address: '23 Anna Nagar, Chennai', bio: 'Dr. Nair is passionate about making dental visits enjoyable for children. She uses the latest pain-free techniques.', rating: 4.9, experience_years: 8, consultation_fee: 600, available_today: true, phone: '+91-9876543213' },
  { name: 'Dr. Rahul Gupta', specialty: 'Pediatric & Family Dentist', clinic_name: 'Family Smile Clinic', city: 'Pune', address: '56 FC Road, Pune', bio: 'Dr. Gupta provides comprehensive dental care for the whole family with a special focus on children under 12.', rating: 4.6, experience_years: 9, consultation_fee: 650, available_today: false, phone: '+91-9876543214' },
  { name: 'Dr. Meena Iyer', specialty: 'Pediatric Dentist', clinic_name: 'Little Smiles Dental', city: 'Hyderabad', address: '89 Banjara Hills, Hyderabad', bio: 'Dr. Iyer creates a welcoming, child-friendly atmosphere. She specializes in treating dental anxiety in young patients.', rating: 4.8, experience_years: 11, consultation_fee: 750, available_today: true, phone: '+91-9876543215' },
];

const TIPS = [
  { title: 'Start brushing early', content: 'Begin brushing your baby\'s gums with a soft cloth even before teeth appear. Once teeth erupt, use a tiny smear of fluoride toothpaste.', emoji: '🦷', category: 'Habits' },
  { title: 'Two minutes, twice a day', content: 'Children should brush for at least 2 minutes, twice daily — once in the morning and once before bed. Use a timer or fun song to make it engaging.', emoji: '⏱️', category: 'Habits' },
  { title: 'Limit sugary snacks', content: 'Bacteria in the mouth feed on sugar and produce acids that cause cavities. Limit juice, candy, and sticky snacks — opt for water, cheese, and fresh fruit instead.', emoji: '🍎', category: 'Diet' },
  { title: 'First dental visit by age 1', content: 'The American Academy of Pediatric Dentistry recommends the first dental visit by age 1 or within 6 months of the first tooth appearing.', emoji: '📅', category: 'Visits' },
  { title: 'Floss daily from age 2', content: 'As soon as your child has two teeth that touch, start flossing. Use child-sized flossers to make it easier and fun.', emoji: '🧵', category: 'Habits' },
  { title: 'Fluoride protects teeth', content: 'Fluoride strengthens tooth enamel and prevents cavities. Use a rice-grain amount of fluoride toothpaste for children under 3, and a pea-size amount from ages 3–6.', emoji: '💧', category: 'Protection' },
  { title: 'Avoid bottle at bedtime', content: 'Putting a baby to bed with a bottle of milk or juice can cause severe tooth decay (bottle rot). Use water in bedtime bottles instead.', emoji: '🍼', category: 'Habits' },
  { title: 'Wear a mouthguard for sports', content: 'Custom-fitted mouthguards protect teeth during contact sports. They can prevent knocked-out or broken teeth — a worthwhile investment!', emoji: '⚽', category: 'Protection' },
  { title: 'Watch for thumb-sucking', content: 'Thumb-sucking is normal up to age 2–3, but persistent habits after age 4 can affect tooth alignment. Talk to your dentist if you\'re concerned.', emoji: '👍', category: 'Development' },
  { title: 'Drink plenty of water', content: 'Water (especially fluoridated tap water) is the best drink for teeth. It rinses away food particles and delivers fluoride to strengthen enamel.', emoji: '💧', category: 'Diet' },
  { title: 'Check for early signs', content: 'Look for white or brown spots on your child\'s teeth — these can be early signs of cavities. Catching them early makes treatment much simpler.', emoji: '🔍', category: 'Visits' },
  { title: 'Make brushing fun', content: 'Let your child pick their own toothbrush with their favourite character. Play music, use apps, or brush together to make it an enjoyable routine.', emoji: '🎵', category: 'Habits' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = req.headers['x-seed-secret'];
  if (secret !== process.env.SEED_SECRET && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    await connectDB();

    const dentistCount = await Dentist.countDocuments();
    const tipCount = await Tip.countDocuments();

    let dentistsAdded = 0;
    let tipsAdded = 0;

    if (dentistCount === 0) {
      await Dentist.insertMany(DENTISTS);
      dentistsAdded = DENTISTS.length;
    }

    if (tipCount === 0) {
      await Tip.insertMany(TIPS);
      tipsAdded = TIPS.length;
    }

    return res.json({
      message: 'Seed complete',
      dentistsAdded,
      tipsAdded,
      alreadySeeded: dentistCount > 0 && tipCount > 0,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message ?? 'Internal server error' });
  }
}
