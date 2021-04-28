const validator = require("validator");
const isEmpty = require("./is-empty");

// Validate user creation input
function validateNewUser(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "username must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }

  // if(validator.isEmpty(data.email)){
  //     errors.email = "Email field is required";
  // }

  // if (!validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters long";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

// Validate Login input
function validateLogin(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "username must be between 2 and 30 characters";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}

// Validate password reset
function validatePasswordReset(data) {
  let errors = {};

  data.currentPassword = !isEmpty(data.currentPassword)
    ? data.currentPassword
    : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";

  if (!validator.isLength(data.currentPassword, { min: 6, max: 30 })) {
    errors.currentPassword = "Password is incorrect";
  }

  if (!validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Password is of invalid length";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = {
  validateNewUser: validateNewUser,
  validateLogin: validateLogin,
  validatePasswordReset: validatePasswordReset,
};
