const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const tenderRoutes = require('./routes/tenderRoutes');
const authRoutes = require('./routes/authRoutes');  // Ensure authRoutes is imported

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/tenders', tenderRoutes);
app.use('/api/auth', authRoutes);  // Register the auth routes correctly

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
