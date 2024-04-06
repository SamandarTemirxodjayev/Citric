const { Router } = require("express");
const translationRoutes = require("./translationRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const blogRoutes = require("./blogRoutes");
const brandRoutes = require("./brandRoutes");
const commentRoutes = require("./commentRoutes");
const achievementRoutes = require("./achievementRoutes");
const orderRoutes = require("./orderRoutes");

const router = Router();

router.use(translationRoutes);
router.use(userRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(blogRoutes);
router.use(brandRoutes);
router.use(commentRoutes);
router.use(achievementRoutes);
router.use(orderRoutes);

module.exports = router;
