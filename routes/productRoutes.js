const { Router } = require("express");
const productController = require("../controller/productsController");
const uploadMiddleware = require("../middlewares/upload.middleware")
const authMiddleware = require("../middlewares/auth.middleware")

const productRoutes = Router();

productRoutes.get("/products", productController.getAll);
productRoutes.get("/products/:id", productController.findById);
productRoutes.get("/products/search/:title", productController.search);
productRoutes.post("/products", authMiddleware, uploadMiddleware, productController.addProduct);
productRoutes.put("/products/:id", authMiddleware, uploadMiddleware, productController.updateProduct);
productRoutes.delete("/products/:id", authMiddleware, productController.deleteProduct);

module.exports = productRoutes;
