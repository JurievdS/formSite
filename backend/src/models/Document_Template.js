const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Document_Template = new Schema({
  docName: {
    type: String,
    required: true,
    unique: true,
  },
  docCategory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  ],
  docType: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Type",
    },
  ],
  partNumber: {
    type: String,
    required: true,
    unique: true,
  },
});
