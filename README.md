# Event RSVP App

A professional Next.js app for RSVPing to Pastor's Birthday Celebration.

## Features
- Comprehensive RSVP form with contact info, attendance, guests, and allergies
- Sends RSVP via email to organizer
- Responsive, modern UI with Tailwind CSS

## Setup
1. Install dependencies: `npm install`
2. Create `.env.local` with your Gmail credentials:
   ```
   EMAIL_USER=yourgmail@gmail.com
   EMAIL_PASS=yourapppassword
   ```
   (Get app password from Gmail settings > Security > 2-Step Verification > App passwords)
3. Run locally: `npm run dev`
4. Deploy to Vercel: `vercel` (set env vars in Vercel dashboard)

Update the `to` email in `pages/api/rsvp.js` to your organizer's email.

## For WhatsApp Notifications
Since direct WhatsApp sending requires paid services, you can:
1. Set up email forwarding from Gmail to WhatsApp
2. Use Gmail's "Forward a copy" rule to send emails to your WhatsApp email address
3. Or check your email on your phone to see RSVPs and reply via WhatsApp

## Advice on Sending Invites
The best day to send invites is mid-week, like Wednesday or Thursday, to give people time to respond before the weekend. Send at least a week in advance.