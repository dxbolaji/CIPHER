const express = require('express');
const router = express.Router();
const { generateNarrative, chat } = require('../controllers/AiController');

router.post('/narrative', generateNarrative);  // POST /api/ai/narrative
router.post('/chat', chat);                    // POST /api/ai/chat (voice companion)

module.exports = router;