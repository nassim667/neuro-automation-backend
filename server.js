const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Neuro Automation Backend is LIVE!',
    status: 'operational',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Healthy',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Server running on port ${PORT}`);
});
