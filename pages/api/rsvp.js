import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'rsvps.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, attending, guests, allergies, additionalAllergies } = req.body;

    try {
      // Ensure data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
      }

      // Read existing RSVPs
      let rsvps = [];
      if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        rsvps = JSON.parse(data);
      }

      // Add new RSVP
      const newRSVP = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        attending,
        guests: parseInt(guests),
        allergies,
        additionalAllergies,
        createdAt: new Date().toISOString(),
      };
      rsvps.push(newRSVP);

      // Write back to file
      fs.writeFileSync(dataFile, JSON.stringify(rsvps, null, 2));

      res.status(200).json({ message: 'RSVP saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving RSVP. Please try again.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}