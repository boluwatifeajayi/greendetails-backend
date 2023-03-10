const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors')

const app = express();

const settings = 'production'

// Connect Database
connectDB();

const whiteList = ["http://localhost:3000", "http://localhost:3000","http://localhost:3001", "https://testt-orpin.vercel.app", "https://greendetails.onrender.com/", "https://early.vercel.app"];
const corsOption = {
  origin: whiteList,
  credentials: true,
};

app.use(cors());
// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// serve frontend


// Serve static assets in production
if (settings === 'production') {
  // Set static folder
 
  app.use(express.static(path.join(__dirname, './client/build')))

  

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
