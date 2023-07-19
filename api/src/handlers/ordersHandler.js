const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/ordersController.js");

const getAllOrdersHandler = async (req, res) => {
  try {
    const allOrders = await getAllOrders();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOrderHandler = async (req, res) => {
  try {
    const { preferenceId, checkout, item, operationType, userEmail } = req.body;
    const newOrder = await createOrder(preferenceId, checkout, item, operationType, userEmail);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateOrderByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferenceId, checkout, item, operationType, userId } = req.body;
    const updatedOrder = await updateOrder(id, preferenceId, checkout, item, operationType, userId);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteOrderByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteOrder(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllOrdersHandler,
  getOrderByIdHandler,
  createOrderHandler,
  updateOrderByIdHandler,
  deleteOrderByIdHandler,
};
