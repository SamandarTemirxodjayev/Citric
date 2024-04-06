const { Router } = require("express");
const orderController = require("../controller/orderController");
const authMiddleware = require("../middlewares/auth.middleware");

const orderRouter = Router();

orderRouter.get('/orders', authMiddleware, orderController.getAll);
orderRouter.post('/orders', orderController.addOrder);
orderRouter.put('/orders/:id', authMiddleware, orderController.updateStatus);
orderRouter.delete("/orders/:id", authMiddleware, orderController.deleteOrder);

module.exports = orderRouter;
