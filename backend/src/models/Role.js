const mongoose = require("mongoose");
const { schema } = require("./User");
const Schema = mongoose.Schema;

const Role = new Schema(
    {
        roleName: {
            type: String,
            required: true,
            unique: true
        },
        roleDescr: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("Role", Role);