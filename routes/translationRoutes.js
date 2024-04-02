const { Router } = require("express");
const translationController = require("../controller/translationController");
const translationRouter = Router();

translationRouter.get("/translations", translationController.getAll);
translationRouter.get("/translations/:lang", translationController.findByLang);
translationRouter.get("/translations/search/:message", translationController.search);
translationRouter.post("/translations/:lang", translationController.create);
translationRouter.put("/translations/:id", translationController.update);

module.exports = translationRouter;