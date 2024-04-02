const { Router } = require("express");
const translationRoutes = require("./translationRoutes");
const userRoutes = require("./userRoutes");
const router = Router();

router.use(translationRoutes);
router.use(userRoutes);

module.exports = router;