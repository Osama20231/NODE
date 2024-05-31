const mongoose = require("mongoose");

let placeSchema = mongoose.Schema({
  name: String,
  landscape: String,
  location: String,
});
let Place = mongoose.model("Place", placeSchema);
module.exports = Place;