const Part = require("../models/Part");

// Get all parts
module.exports = function getParts(req, res) {
  const errors = {};
  try {
    Part.find().then((parts) => {
      if (!parts) {
        errors.parts = "No parts found. Please contact your administrator.";
        return res.status(400).json(errors);
      }
      console.log(parts);
      return res.status(200).json(parts);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = function addPart(req, res) {
  const errors = {};

  const partNumber = req.body.partNumber;

  try {
    Part.findOne({ partNumber }).then((part) => {
      if (part) {
        errors.partNumber = "Part number already in use.";
        return res.status(400).json(errors);
      } else {
        const newPart = new Part({
          partNumber: partNumber,
          partName: req.body.partName,
          values: req.body.values,
          refImage: req.file.id,
        });

        console.log("newPart");
        newPart
          .save()
          .then((part) => res.json(part))
          .catch((err) => console.log(err));
      }
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
};
