import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, attending, guests, allergies, additionalAllergies } = req.body;

    // For testing, skip sending if credentials not set
    if (process.env.EMAIL_USER === 'yourgmail@gmail.com' || !process.env.EMAIL_USER) {
      console.log('Test mode: RSVP data:', { name, email, phone, attending, guests, allergies, additionalAllergies });
      res.status(200).json({ message: 'RSVP received (test mode)!' });
      return;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ORGANIZER_EMAIL || 'kosileolamide@gmail.com', // Organizer's email
      subject: 'New RSVP for Pastor\'s Birthday',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAttending: ${attending}\nGuests: ${guests}\nAllergies: ${allergies.join(', ')}\nAdditional Allergies: ${additionalAllergies}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'RSVP sent successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending RSVP. Please try again.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}