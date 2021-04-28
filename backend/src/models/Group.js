const mongoose = require("mongoose");
const Schems = mongoose.Schema;

const Group = new Schems({
  groupName: {
    type: String,
    required: true,
    unique: true,
  },
  groupDescr: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Group", Group);
