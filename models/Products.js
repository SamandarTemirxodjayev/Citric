const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  productTitleUz: {
    type: String,
    required: true,
  },
  productTitleEn: {
    type: String,
    required: true,
  },
  productTitleRu: {
    type: String,
    required: true,
  },
  productTitleKr: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  descriptionUz: {
    type: String,
    required: true,
  },
  descriptionRu: {
    type: String,
    required: true,
  },
  descriptionEn: {
    type: String,
    required: true,
  },
  descriptionKr: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  weight: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category"
  },
  aboutUz: {
    type: String, 
    default: null
  },
  aboutEn: {
    type: String, 
    default: null
  },
  aboutRu: {
    type: String, 
    default: null
  },
  aboutKr: {
    type: String, 
    default: null
  },
  advantagesUz: {
    type: String,
    default: null
  },
  advantagesEn: {
    type: String,
    default: null
  },
  advantagesRu: {
    type: String,
    default: null
  },
  advantagesKr: {
    type: String,
    default: null
  },
});

const Products = mongoose.model("Products", ProductsSchema);
module.exports = Products;