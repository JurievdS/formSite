const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Document_Category = new Schema({
  docCategory: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Document_Category", Document_Category);
