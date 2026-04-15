# Event RSVP System

A professional, full-featured RSVP management system built with Next.js for event organizers. Features a modern, responsive design with comprehensive guest management capabilities.

## ✨ Features

### 🎯 Core Functionality
- **Professional RSVP Form**: Clean, accessible form with validation for guest information
- **Database Storage**: Secure JSON-based storage (easily upgradeable to MongoDB/PostgreSQL)
- **Admin Dashboard**: Complete administrative interface for managing RSVPs
- **Real-time Updates**: Instant form submission feedback and admin panel updates

### 🎨 User Experience
- **Modern Design**: Professional UI with gradient backgrounds and smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG-compliant design with proper focus states and screen reader support
- **Loading States**: Elegant loading indicators and status messages

### 👥 Guest Management
- **Contact Information**: Name, email, phone number collection
- **Attendance Tracking**: Yes/No attendance with guest count
- **Dietary Restrictions**: Comprehensive allergy and dietary needs tracking
- **Data Validation**: Client and server-side form validation

### 🔐 Admin Features
- **Secure Login**: Password-protected admin access
- **RSVP Management**: View, filter, and delete RSVPs
- **Analytics Dashboard**: Attendance statistics and response tracking
- **Data Export**: Structured data display for easy management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd event-rsvp
   npm install
   ```

2. **Environment Setup**
   Create `.env.local`:
   ```env
   # Database (optional - defaults to local JSON storage)
   MONGODB_URI=mongodb://localhost:27017/event-rsvp

   # Admin Configuration
   ADMIN_PASSWORD=your_secure_password_here
   ```

3. **Development**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

## 📱 Usage

### For Guests
1. Visit the RSVP page
2. Fill out the comprehensive form
3. Submit to confirm attendance
4. Receive immediate confirmation

### For Administrators
1. Click "Admin Access" on the main page
2. Enter the admin password
3. View all RSVPs in the dashboard
4. Delete entries if needed
5. Monitor attendance statistics

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: JSON file storage (MongoDB ready)
- **Styling**: Tailwind CSS with custom gradients
- **Icons**: Heroicons (SVG)

### Project Structure
```
event-rsvp/
├── pages/
│   ├── _app.js          # App wrapper
│   ├── index.js         # Main RSVP page
│   └── api/
│       ├── rsvp.js      # RSVP submission API
│       └── admin.js     # Admin management API
├── lib/
│   └── mongodb.js       # Database connection (optional)
├── models/
│   └── RSVP.js          # Data models (optional)
├── data/
│   └── rsvps.json       # Local data storage
└── styles/
    └── globals.css      # Global styles
```

## 🔧 Configuration

### Database Options

**Local JSON Storage (Default)**
- No setup required
- Perfect for small events
- Data persists in `data/rsvps.json`

**MongoDB Atlas (Recommended for Production)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event-rsvp
```

### Admin Password
Set a secure password in `.env.local`:
```env
ADMIN_PASSWORD=YourSecurePassword123!
```

## 🎨 Design System

### Colors
- **Primary**: Blue to Indigo gradient (`blue-600` to `indigo-600`)
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Green for success, Red for errors

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Clean, readable text with proper hierarchy
- **Labels**: Medium weight for form labels

### Components
- **Forms**: Rounded inputs with focus states
- **Buttons**: Gradient backgrounds with hover effects
- **Cards**: White backgrounds with subtle shadows
- **Tables**: Clean data tables with hover states

## 📊 Admin Dashboard Features

- **Response Overview**: Total RSVPs and attendance breakdown
- **Detailed Table**: All guest information in organized columns
- **Status Badges**: Visual attendance indicators
- **Delete Functionality**: Remove incorrect entries
- **Responsive Design**: Works on all screen sizes

## 🔒 Security

- **Password Protection**: Admin access requires authentication
- **Input Validation**: Client and server-side validation
- **Data Sanitization**: Safe data handling
- **No External Dependencies**: Self-contained application

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Static deployment with functions
- **Railway**: Full-stack deployment
- **Heroku**: Traditional hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with Next.js and Tailwind CSS
- Icons from Heroicons
- Inspired by modern event management platforms

---

**Need Help?** Check the [Next.js documentation](https://nextjs.org/docs) or open an issue on GitHub.