const mongoose = require("mongoose");

const { MONGO_URI } = require("./config");

const options = {
  poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(MONGO_URI, options);
mongoose.Promise = global.Promise;

const mongoConn = mongoose.connection;

module.exports = mongoConn;
