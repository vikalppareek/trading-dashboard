const { Schema } = require("mongoose");

const UsersSchema = new Schema({
  name: String,
  Mobile_no: Number,
  Password: String,
});

module.exports = { UsersSchema };
