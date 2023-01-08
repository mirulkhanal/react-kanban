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
    // req.session.user = req.user;
    return res.send(req.user);
  }
  return res.send(false);
});

router.get('/logout', (req, res) => {
  console.log('USER BEFORE LOGOUT', req.user);
  req.logout((err) => {
    if (err) {
      console.log('LOGOUT ERROR', err);
    }
  });
  console.log('USER AFTER LOGOUT', req.user);
  return res.send({ success: true, message: 'Successfully logged out' });
});

module.exports = router;
