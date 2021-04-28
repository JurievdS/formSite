const Router = require("express").Router();
const { getGroups, getRoles } = require("../controllers/adminController")

Router.get("/groups", getGroups);
Router.get("/roles", getRoles);

module.exports = Router;