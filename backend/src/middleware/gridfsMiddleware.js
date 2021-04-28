const mongoose = require("mongoose");
const mongoConn = require("../config/db");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const GridFsStream = require("gridfs-stream");

const { MONGO_URI } = require("../config/config");

let gfs;

mongoConn.once("open", () => {
  gfs = GridFsStream(mongoConn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
let storage = new GridFsStorage({
  url: MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketname: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

module.exports = upload;
