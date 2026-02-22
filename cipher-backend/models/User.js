const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  // lifestyle inputs for risk calculation
  smoker: { type: Boolean, default: false },
  diabetic: { type: Boolean, default: false },
  exerciseFrequency: { type: String, enum: ['none', 'low', 'moderate', 'high'], default: 'low' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);