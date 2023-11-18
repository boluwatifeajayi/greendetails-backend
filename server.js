const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the cors middleware
const path = require('path');

const app = express();

const settings = 'production';

// Connect Database
connectDB();

// Init Middleware
app.use(cors()); // Use cors middleware to handle CORS issues
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (settings === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, './client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
