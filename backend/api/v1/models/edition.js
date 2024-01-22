const mongoose = require("mongoose");
// const Address = require("./address");
const Schema = mongoose.Schema;

const editionSchema = new Schema({
  edition: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Editon", editionSchema);
