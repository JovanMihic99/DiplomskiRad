const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const editionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Edition", editionSchema);
