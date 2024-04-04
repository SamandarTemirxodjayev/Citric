const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  }
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;