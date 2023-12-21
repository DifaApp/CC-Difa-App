// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use('/auth', authRoutes); 
app.use('/profile', profileRoutes);

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send(
      "Wellcome To difa API Profile"
  )
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});