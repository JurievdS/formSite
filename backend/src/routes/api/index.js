const Router = require("express").Router();
const upload = require("../../middleware/gridfsMiddleware");
const addPart = require("../../controllers/partController");
const userRouter = require("./usersRoutes")

Router.get("/test", (req, res) => {
  res.json({ msg: "Ping API test" });
});

Router.use("/user", userRouter)


module.exports = Router;
