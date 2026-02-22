const mongoose = require('mongoose');

const bpReadingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  systolic: { type: Number, required: true },   // e.g. 120
  diastolic: { type: Number, required: true },  // e.g. 80
  pulse: { type: Number },
  notes: { type: String },
  // Risk level calculated at time of reading
  riskLevel: { type: String, enum: ['normal', 'elevated', 'high', 'crisis'], default: 'normal' },
}, { timestamps: true });

module.exports = mongoose.model('BPReading', bpReadingSchema);