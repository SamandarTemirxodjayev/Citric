const { Router } = require("express");
const achievementController = require("../controller/achievementsController");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");

const achievementRoutes = Router();

achievementRoutes.get("/achievements", achievementController.getAll);
achievementRoutes.post("/achievements",authMiddleware, uploadMiddleware, achievementController.addAchievements);
achievementRoutes.put("/achievements/:id", authMiddleware, uploadMiddleware, achievementController.updateAchievement);
achievementRoutes.delete("/achievements/:id", authMiddleware, achievementController.deleteAchievement);

module.exports = achievementRoutes;
