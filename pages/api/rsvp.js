import connectToDatabase from '../../lib/mongodb';
import RSVP from '../../models/RSVP';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, attending, guests, allergies, additionalAllergies } = req.body;

    try {
      await connectToDatabase();

      // Create new RSVP
      const newRSVP = new RSVP({
        id: Date.now().toString(),
        name,
        email,
        phone,
        attending,
        guests: parseInt(guests),
        allergies,
        additionalAllergies,
      });

      await newRSVP.save();

      res.status(200).json({ message: 'RSVP saved successfully!' });
    } catch (error) {
      console.error('RSVP save error:', error.message || error);
      res.status(500).json({
        message: 'Error saving RSVP. Please try again.',
        detail: error.message || 'Unknown error',
      });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}