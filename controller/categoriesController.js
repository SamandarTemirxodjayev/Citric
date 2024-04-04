const Category = require("../models/Category");
const filterByLang = require("../utils/filterByLang");

exports.getAll = async (req, res) => {
  try {
    const lang = req.query.lang;
    const Categories = await Category.find();
    const filtered = filterByLang(Categories, lang, "categoryName");
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: filtered,
    });
  } catch (err) {
    return res.json({
      message: "Interval Server error!",
      error: err.message,
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      images: req.images,
      ...req.body,
    });
    await newCategory.save();
    return res.status(201).json({
      status: 201,
      message: "Category Created",
      data: newCategory,
    });
  } catch (err) {
    return res.json({
      message: "Interval Server error!",
      error: err.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let findCategory = await Category.findById(req.params.id);

    if (!findCategory) {
      return res.status(404).json({
        message: "Category Not Found"
      });
    }

    if(req.images.length > 0) {
      req.body.images = req.images
    } else {
      req.body.images = JSON.parse(req.body.images)
    }

    findCategory.set(req.body);
    await findCategory.save();

    return res.status(200).json({
      message: "Category Updated Successfully",
      data: findCategory,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  };
}

exports.deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    
    if(!deleteCategory) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Category Deleted"
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
