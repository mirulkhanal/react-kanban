const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
  })
);

// middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
