const Router = require("express").Router();
const auth = require("../../middleware/auth");
const { login, authToken } = require("../../controllers/authController");

Router.get("/test", () => {
  res.status(200).json({ msg: "Ping auth test route" });
});

Router.get("/", authToken);
Router.post("/", login);

module.exports = Router;
