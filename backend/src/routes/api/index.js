const Router = require("express").Router();
const authRouter = require("./authRoutes")
const userRouter = require("./usersRoutes")

Router.get("/test", (req, res) => {
  res.json({ msg: "Ping API test" });
});

Router.use("/auth", authRouter)
Router.use("/user", userRouter)


module.exports = Router;
