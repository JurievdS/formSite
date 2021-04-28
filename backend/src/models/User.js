const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
      },
    ],
    roles: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Role",
      },
    ],
    accountStatus: {
      type: String,
      required: true,
      default: "Enabled",
    },
    accountVisible: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
