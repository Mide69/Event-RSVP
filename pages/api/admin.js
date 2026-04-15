import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'rsvps.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Birthday123'; // Change this to a secure password

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
      try {
        let rsvps = [];
        if (fs.existsSync(dataFile)) {
          const data = fs.readFileSync(dataFile, 'utf8');
          rsvps = JSON.parse(data);
        }
        res.status(200).json({ success: true, rsvps });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching RSVPs' });
      }
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } else if (req.method === 'GET') {
    // For simplicity, allow GET to fetch RSVPs (not secure, for demo only)
    try {
      let rsvps = [];
      if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        rsvps = JSON.parse(data);
      }
      res.status(200).json({ rsvps });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching RSVPs' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    try {
      let rsvps = [];
      if (fs.existsSync(dataFile)) {
        const data = fs.readFileSync(dataFile, 'utf8');
        rsvps = JSON.parse(data);
      }
      const updatedRsvps = rsvps.filter(rsvp => rsvp.id !== id);
      fs.writeFileSync(dataFile, JSON.stringify(updatedRsvps, null, 2));
      res.status(200).json({ success: true, message: 'RSVP deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error deleting RSVP' });
    }
  } else {
  }
}