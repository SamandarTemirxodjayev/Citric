const { Router } = require("express");
const blogController = require("../controller/blogController");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");

const blogRoutes = Router();

blogRoutes.get("/blogs", blogController.getAll);
blogRoutes.get("/blogs/:id", blogController.findById);
blogRoutes.post("/blogs", authMiddleware, uploadMiddleware, blogController.addBlog);
blogRoutes.put("/blogs/:id", authMiddleware, uploadMiddleware, blogController.updateBlog);
blogRoutes.delete("/blogs/:id", authMiddleware, blogController.deleteBlog);

module.exports = blogRoutes;
