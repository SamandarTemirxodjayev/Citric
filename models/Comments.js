const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  image: {
    type: Array,
    required: true,
  },
  descriptionUz: {
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
  descriptionRu: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comments", CategorySchema);

module.exports = Comment;