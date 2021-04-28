const Router = require("express").Router();

Router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Ping part test route" });
});



Router.post("/addDoc", upload.single("file"), (req, res) => {
  addPart(req, res);
});

module.exports = Router;
