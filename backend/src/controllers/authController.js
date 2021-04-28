const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const { JWT_KEY } = require("../config/config");
const { validateLogin } = require("../validation/userValidations");

// Login
function login(req, res) {
    const { errors, isValid } = validateLogin(req.body);
  
    console.log(isValid)
    // Check validation
    if (!isValid) {
      console.log(errors)
      return res.status(400).json(errors);
    }
  
    const username = req.body.username.trim();
    const password = req.body.password.trim();
  
    try {
      User.findOne({ username: username }).then((user) => {
        // Check for user
        if (!user) {
          errors.username = "Username does not exist.";
          return res.status(403).json(errors);
        }
  
        // Check if user account is active
        if (user.accountStatus === "Disabled") {
          errors.accountStatus =
            "Account disabled. Please contact to your administrator.";
          return res.status(403).json(errors);
        }
  
        // Check Password
        bcrypt.compare(password, user.password).then((isMatch) => {
          // User Matched
          if (isMatch) {
            // Create JWT Payload
            const payload = { user: { id: user.id } };
  
            // Sign Token
            jwt.sign(payload, JWT_KEY, { expiresIn: 3600 }, (err, token) => {
              res.json({ token });
            });
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: "Internal server error." });
    }
}

// Get user by token
function authToken(req, res) {
    try {
        const user =  User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
  login: login,
  authToken: authToken
}