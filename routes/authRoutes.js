const passport = require('../services/passport');

const router = require('express').Router();
const CLIENT_URL = 'http://localhost:5173';
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google will redirect the user to this URL after authentication
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: `${CLIENT_URL}/login`,
  })
);

router.get('/user', (req, res) => {
  if (req.user) {
    req.session.user = req.user;
    res.send(req.user);
  } else {
    res.send(null);
  }
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect(`${CLIENT_URL}/login`);
});

module.exports = router;
