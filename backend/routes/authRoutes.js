const express = require("express");
const router = express.Router();
const passport = require('passport');


// Google Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const userData = req.user;
    const token = req.user.token;
    res.redirect(
      `http://localhost:3000?token=${encodeURIComponent(token)}&user=${encodeURIComponent(
        JSON.stringify(userData)
      )}`
    );
  }
);

module.exports = router;