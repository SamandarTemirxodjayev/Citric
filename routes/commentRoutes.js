const { Router } = require("express");
const commentController = require("../controller/commentController");
const authMiddleware = require("../middlewares/auth.middleware");
const uploadMiddleware = require("../middlewares/upload.middleware");

const commentRoutes = Router();

commentRoutes.get("/comments", commentController.getAll);
commentRoutes.post("/comments", authMiddleware, uploadMiddleware, commentController.addComment);
commentRoutes.put("/comments/:id", authMiddleware, uploadMiddleware, commentController.updateComment);
commentRoutes.delete("/comments/:id", authMiddleware, commentController.deleteComment);

module.exports = commentRoutes;
