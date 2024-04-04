const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  images: {
    type: Array,
    required: true,
  },
  categoryNameUz: {
    type: String,
    required: true,
  },
  categoryNameRu: {
    type: String,
    required: true,
  },
  categoryNameEn: {
    type: String,
    required: true,
  },
  categoryNameKr: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;