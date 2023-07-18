const { Orders, users } = require("../db");

const getAllOrders = async () => {
  const allOrders = await Orders.findAll();
  return allOrders;
};

const getOrderById = async (id) => {
  const order = await Orders.findByPk(id);
  if (!order) throw new Error(`Order with id ${id} not found`);
  return order;
};

const createOrder = async (preferenceId, checkout, item, operationType, userEmail) => {
  const user = await users.findOne({ where: { email: userEmail } });
  if (!user) throw new Error(`Can't create order because user with email ${userEmail} doesn't exist in database`);
  const findOrder = await Orders.findOne({ where: { preferenceId: preferenceId } });
  if (findOrder) throw new Error(`There is already an order with preference id ${preferenceId} (Order ${findOrder.id})`);
  const newOrder = await Orders.create({ preferenceId, checkout, item, operationType });
  await newOrder.setUser(user);
  return newOrder;
};

const updateOrder = async (id, preferenceId, checkout, item, operationType, userId) => {
  
};

const deleteOrder = async (id) => {
 const orderToDestroy = await Orders.findByPk(id);
 await orderToDestroy.destroy();
 const remainingOrders = await Orders.findAll();
 return remainingOrders;
};


module.exports = { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder };
