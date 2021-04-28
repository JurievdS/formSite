const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Document_Type = new Schema({
  docType: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Document_Type", Document_Type);
