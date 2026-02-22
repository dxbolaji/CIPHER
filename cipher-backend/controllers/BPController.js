const BPReading = require('../models/Bpreading');

// Simple risk level calculator based on standard BP ranges
const calculateRiskLevel = (systolic, diastolic) => {
  if (systolic >= 180 || diastolic >= 120) return 'crisis';
  if (systolic >= 140 || diastolic >= 90) return 'high';
  if (systolic >= 130 || diastolic >= 80) return 'elevated';
  return 'normal';
};

// POST /api/bp/:userId
const addReading = async (req, res) => {
  try {
    const { systolic, diastolic, pulse, notes } = req.body;
    const { userId } = req.params;

    const riskLevel = calculateRiskLevel(systolic, diastolic);

    const reading = await BPReading.create({
      userId,
      systolic,
      diastolic,
      pulse,
      notes,
      riskLevel,
    });

    res.status(201).json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/bp/:userId — returns all readings sorted by newest first
const getReadings = async (req, res) => {
  try {
    const readings = await BPReading.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/bp/:userId/latest
const getLatestReading = async (req, res) => {
  try {
    const reading = await BPReading.findOne({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    if (!reading) return res.status(404).json({ message: 'No readings found' });
    res.json(reading);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReading, getReadings, getLatestReading };