const { Router } = require('express')
const brandController = require("../controller/brandController")
const authMiddleware = require("../middlewares/auth.middleware")
const uploadMiddleware = require("../middlewares/upload.middleware")

const brandRoutes = Router();

brandRoutes.get("/brands", brandController.getBrands);
brandRoutes.post("/brands", authMiddleware, uploadMiddleware, brandController.addBrand);
brandRoutes.put("/brands/:id", authMiddleware, uploadMiddleware, brandController.updateBrand);
brandRoutes.delete("/brands/:id", authMiddleware, brandController.deleteBrand);

module.exports = brandRoutes;