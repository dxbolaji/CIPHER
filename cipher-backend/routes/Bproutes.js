const express = require('express');
const router = express.Router();
const { addReading, getReadings, getLatestReading } = require('../controllers/Bpcontroller');

router.post('/:userId', addReading);         // POST /api/bp/:userId
router.get('/:userId', getReadings);          // GET  /api/bp/:userId  (all history)
router.get('/:userId/latest', getLatestReading); // GET  /api/bp/:userId/latest

module.exports = router;