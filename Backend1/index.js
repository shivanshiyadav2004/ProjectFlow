const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/userRoutes');
const proutes = require('./routes/projectRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  });

// Routes
app.use('/api', routes);
app.use('/api', proutes);

// Health Check Route (useful for Render)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ProjectFlow Backend is running successfully',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});