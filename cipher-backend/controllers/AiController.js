const { generateHealthNarrative, handleChat } = require('../services/aiService');
const User = require('../models/User');
const BPReading = require('../models/Bpreading');

// POST /api/ai/narrative
// Body: { userId, systolic, diastolic, riskLevel }
const generateNarrative = async (req, res) => {
  try {
    const { userId, systolic, diastolic, riskLevel } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Get recent readings for trend context
    const recentReadings = await BPReading.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const narrative = await generateHealthNarrative({
      systolic,
      diastolic,
      riskLevel,
      user,
      recentReadings,
    });

    res.json({ narrative });
  } catch (error) {
    console.error('Narrative error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// POST /api/ai/chat
// Body: { message, mode ('ghost' | 'optimal'), conversationHistory (array) }
const chat = async (req, res) => {
  try {
    const { message, mode = 'optimal', conversationHistory = [] } = req.body;

    const reply = await handleChat({ message, mode, conversationHistory });

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateNarrative, chat };