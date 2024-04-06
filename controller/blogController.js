const Blog = require("../models/Blog");
const filterByLang = require("../utils/filterByLang");
const filterByLangSingle = require("../utils/filterByLangSingle");

exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .skip((req.query.page - 1) * req.query.perPage)
      .limit(req.query.perPage);
    const filteredTitle = filterByLang(blogs, req.query.lang, "title");
    const filterDesc = filterByLang(filteredTitle, req.query.lang, "description");
    const total = await Blog.countDocuments();
    return res.status(200).json({
      status: 200,
      data: filterDesc,
      _meta: {
        currentPage: +req.query.page,
        perPage: +req.query.perPage,
        totalCount: total,
        pageCount: Math.ceil(total / req.query.perPage),
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.findById = async (req, res) => {
  try {
    const findBlog = await Blog.findById(req.params.id);

    if (!findBlog) {
      return res.status(404).json({
        message: "Blog Not Found",
      });
    }

    const filterTitle = await filterByLangSingle(
      findBlog,
      req.query.lang,
      "title"
    );
    const filterDesc = await filterByLangSingle(
      filterTitle,
      req.query.lang,
      "description"
    );

    return res.status(200).json({
      status: 200,
      data: filterDesc,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.addBlog = async (req, res) => {
  try {
    req.body.images = req.images;
    const newBlog = new Blog({
      ...req.body,
    });
    await newBlog.save();
    return res.status(201).json({
      status: 201,
      data: newBlog,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const findBlog = await Blog.findById(req.params.id);

    if (!findBlog) {
      return res.status(404).json({
        message: "Blog Not Found",
      });
    }

    if (req.images.length > 0) {
      if(req.body.images) {
        req.body.images = JSON.parse(req.body.images);
      } else {
        req.body.images = findBlog.images
      }

      for (let image of req.images) {
        req.body.images.push(image);
      }
    } else {
      req.body.images = JSON.parse(req.body.images);
    }

    findBlog.set(req.body);
    await findBlog.save();
    return res.status(200).json({
      status: 200,
      data: findBlog,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({
        message: "Blog Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Blog deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
