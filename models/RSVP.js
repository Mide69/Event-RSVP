import mongoose from 'mongoose';

const RSVPSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  attending: {
    type: String,
    required: true,
    enum: ['yes', 'no'],
  },
  guests: {
    type: Number,
    required: true,
    min: 1,
  },
  allergies: [{
    type: String,
  }],
  additionalAllergies: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RSVP || mongoose.model('RSVP', RSVPSchema);