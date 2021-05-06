const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const morgan = require("morgan");
const api = require("./src/routes/api")

// Environment variables
const { PORT, MONGO_URI } = require("./src/config/config");

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    // Log 
    console.log("Connected to MongoDB database");

    const app = express();

    // Logger Middleware
    app.use(morgan('dev'));
    // Body-parser middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    // Passport middleware
    app.use(passport.initialize());
    // Passport Config
    require("./src/config/passport")(passport);
    
    // Use the api for touting
    app.use("/api", api);

    // Listen to ncomming requests on PORT
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
