const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const { JWT_KEY } = require("../config/config");
const {
  validateNewUser,
  validatePasswordReset,
} = require("../validation/userValidations");

// Get list of users
function getUsers(req, res) {
  const errors = {};
  try {
    User.find().then((users) => {
      if (!users) {
        errors.users = "No users found. Please contact your administrator.";
        return res.status(400).json(errors);
      }
      return res.status(200).json(users);
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

// Get user by id
function getUser(req, res) {
  const errors = {};
  const id = req.params.id;
  // console.log(id);
  try {
    User.findById(id).then((user) => {
      if (!user) {
        errors.user = "Failed to load user information.";
      }
      // console.log(user);
      return res.status(200).json(user);
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

// Update user by id
function updateUser(req, res) {
  const id = req.params.id.trim();

  const userAccFields = {};
  if (req.body.firstName) {
    userAccFields.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    userAccFields.lastName = req.body.lastName;
  }
  if (req.body.email) {
    userAccFields.email = req.body.email;
  }

  try {
    User.findById(id).then((user) => {
      if (user) {
        // Update
        User.findOneAndUpdate(
          { user: userAccFields.id },
          { $set: userAccFields },
          { new: true }
        ).then((user) => res.json(user));
      } else {
        return res.status(404).json("User not found.");
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

// Create User
function createUser(req, res) {
  const { errors, isValid } = validateNewUser(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  try {
    User.findOne({ username }).then((user) => {
      console.log(user);
      if (user) {
        errors.username = "username already exists.";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          username: username,
          email: email.toLowerCase(),
          password: password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

// Change Password
function changePassword(req, res) {
  const { errors, isValid } = validatePasswordReset(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const id = req.params.id.trim();
  const currentPassword = req.body.currentPassword.trim();
  const newPassword = req.body.newPassword.trim();

  try {
    User.findById(id).then((user) => {
      if (!user) {
        errors.user = "No user found.";
        return res.status(404).json(errors);
      }
      bcrypt.compare(currentPassword, user.password).then((isMatch) => {
        if (isMatch) {
          //password matched
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;

              User.findOneAndUpdate(
                { _id: id },
                { $set: { password: hash } }
              ).then((user) => {
                return res.status(200).json(user);
              });
            });
          });
        } else {
          return res.status(400).json({ msg: "Passwords did not match." });
        }
      });
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  updateUser: updateUser,
  createUser: createUser,
  changePassword: changePassword,
};
