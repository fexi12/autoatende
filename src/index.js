const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/webhook', require('./routes/webhook'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/bookings', require('./routes/bookings'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', version: '0.1.0' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AutoAtende running on port ${PORT}`));
