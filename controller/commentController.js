const Comments = require("../models/Comments");
const filterByLang = require("../utils/filterByLang");

exports.getAll = async (req, res) => {
  try {
    const comments = await Comments.find();
    const filtered = filterByLang(comments, req.query.lang, "description");
    return res.status(200).json({
      status: 200,
      data: filtered,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    req.body.image = req.images;
    const newComment = new Comments({
      ...req.body,
    });
    await newComment.save();
    return res.status(200).json({
      status: 200,
      data: newComment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    if (req.images.length > 0) {
      req.body.image = req.images;
    } else {
      req.body.image = JSON.parse(req.body.image);
    }

    const findComment = await Comments.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!findComment) {
      return res.status(404).json({
        message: "Blog Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      data: findComment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comments.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).json({
        message: "Blog Not Found",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Comment deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
