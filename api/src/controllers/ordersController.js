const { Orders, users } = require("../db");

const getAllOrders = async () => {
  const allOrders = await Orders.findAll({
    include:{
      model: users,
      attributes: ['id', 'email', 'username']
    }
  });
  return allOrders;
};

const getOrderById = async (id) => {
  const order = await Orders.findByPk(id);
  if (!order) throw new Error(`Order with id ${id} not found`);
  return order;
};

const createOrder = async (preferenceId, checkout, item, operationType, userEmail) => {
  const user = await users.findOne({ where: { email: userEmail } });
  if (!user)
    throw new Error(
      `Can't create order because user with email ${userEmail} doesn't exist in database`
    );
  const findOrder = await Orders.findOne({
    where: { preferenceId: preferenceId },
  });
  if (findOrder)
    throw new Error(
      `There is already an order with preference id ${preferenceId} (Order ${findOrder.id})`
    );
  const newOrder = await Orders.create({ preferenceId, checkout, item, operationType });
  await newOrder.setUser(user);
  user.purchases = [ ...user.purchases, {
    orderId: newOrder.id,
    item: item,
    createdAt: newOrder.createdAt,
  }];
  switch (item.description) {
    case "1 clase":
      user.credits++;
      break;
    case "5 clases":
      user.credits += 5;
      break;
    case "10 clases":
      user.credits += 10;
      break;
    case "25 clases":
      user.credits += 25;
      break;
    case "50 clases":
      user.credits += 50;
      break;
    default:
      break;
  }
  await user.save();
  return newOrder;
};

const updateOrder = async (
  id,
  preferenceId,
  checkout,
  item,
  operationType,
  userId
) => {};

const deleteOrder = async (id) => {
  const orderToDestroy = await Orders.findByPk(id);
  await orderToDestroy.destroy();
  const remainingOrders = await Orders.findAll();
  return remainingOrders;
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
