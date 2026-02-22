const express = require('express');
const router = express.Router();
const { createUser, getUser } = require('../controllers/userController');

router.post('/', createUser);       // POST /api/users
router.get('/:userId', getUser);    // GET  /api/users/:userId

module.exports = router;