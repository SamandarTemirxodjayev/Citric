const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  images: {
    type: Array,
    required: true,
  },
  titleUz: {
    type: String,
    required: true,
  },
  titleRu: {
    type: String,
    required: true,
  },
  titleEn: {
    type: String,
    required: true,
  },
  titleKr: {
    type: String,
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
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
