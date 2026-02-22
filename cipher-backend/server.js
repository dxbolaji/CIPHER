const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/Userroutes'));
app.use('/api/bp', require('./routes/Bproutes'));
app.use('/api/ai', require('./routes/AiRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'CIPHER API is running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));