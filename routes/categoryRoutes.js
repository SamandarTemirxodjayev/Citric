const { Router } = require("express");
const CategoryController = require("../controller/categoriesController");
const authMiddleware = require("../middlewares/auth.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")

const CategoryRoutes = Router();

CategoryRoutes.get("/categories", CategoryController.getAll);
CategoryRoutes.post("/categories", authMiddleware, uploadMiddleware, CategoryController.addCategory);
CategoryRoutes.put("/categories/:id", authMiddleware, uploadMiddleware, CategoryController.updateCategory);
CategoryRoutes.delete("/categories/:id", authMiddleware, CategoryController.deleteCategory);

module.exports = CategoryRoutes;
