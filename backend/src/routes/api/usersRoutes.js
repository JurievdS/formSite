const Router = require("express").Router();
const auth = require("../../middleware/auth");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
} = require("../../controllers/userController");

Router.get("/test", (req, res) => {
  res.status(200).json({ msg: "Ping users test route" });
});

Router.get("/", auth, getUsers);
Router.post("/", createUser);
Router.get("/:id", auth, getUser);
Router.put("/:id/changePassword", auth, changePassword);
Router.put("/:id/updateUser", auth, updateUser);

module.exports = Router;