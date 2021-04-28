const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Part = new Schema({
  partNumber: {
    type: String,
    required: true,
    unique: true,
  },
  partName: {
    type: String,
    required: true,
  },
  values: [
    {
      mesurementNum: {
        type: String,
        required: true,
      },
      bolt: {
        isbolt: {
          type: Boolean,
          default: false,
        },
        boltSize: {
          type: String,
        },
      },
      mesurement: {
        type: String,
      },
    },
  ],
  refImage: {
    type: mongoose.Schema.ObjectId,
    ref: "uploads"
  },
});

module.exports = mongoose.model("Part", Part);
