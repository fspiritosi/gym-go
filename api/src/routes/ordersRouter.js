const { Router } = require("express");
const {
  getAllOrdersHandler,
  getOrderByIdHandler,
  createOrderHandler,
  updateOrderByIdHandler,
  deleteOrderByIdHandler,
} = require("../handlers/ordersHandler");

const ordersRouter = Router();

ordersRouter.get("/", getAllOrdersHandler);
ordersRouter.get("/:id", getOrderByIdHandler);
ordersRouter.post("/", createOrderHandler);
ordersRouter.put("/:id", updateOrderByIdHandler);
ordersRouter.delete("/:id", deleteOrderByIdHandler);

module.exports = ordersRouter;
