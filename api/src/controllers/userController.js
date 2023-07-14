const { users, Events } = require("../db");
const { token } = require("../utils/jwt");
const { registerEmail } = require("../utils/nodemailer");

const userRegister = async (username, email) => {
  const userFound = await users.findOne({ where: { email: email } });
  if (userFound) {
    throw new Error ('Usuario ya existente');
  } else {
    const newUser = await users.create({
      username,
      email,
    });
    await registerEmail(`${email}`);
    return newUser;
  }
};

const userLogin = async (email) => {
  const user = await users.findOne({ where: { email: email } });
  if (!user) {
    return null;
  } else {
    const jwt = token({ email: user.email });
    return jwt;
  }
};

const getAllUsers = async () => {
  const allUsers = await users.findAll({
    include: {
      model: Events,
      attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
      through: { attributes: [] }
    },
  });
  return allUsers;
};

const getUserByEmail = async (email) => {
  const user = await users.findOne({
    where: {
      email: email
    }
  });
  if (!user) throw new Error(`User not found with email ${email}`);
  return user;
}

const getUserById = async (id) => {
  const user = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
      through: { attributes: [] }
    }
  });
  if (!user) throw new Error(`User not found with id ${id}`);
  return user;
};

const updateUserById = async (id, username, purchase, credits, role, isActive, events) => {
  const userToUpdate = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
      through: { attributes: [] }
    }
  });
  if (!userToUpdate) throw new Error (`User with id ${id} not found`);
  if (purchase) {
    // const arrayOfPayments = userToUpdate.purchases.map(purchase => purchase.payment_id);
    // console.log(arrayOfPayments);
    // console.log(purchase.payment_id)
    // if (arrayOfPayments.includes(purchase.payment_id))
    //   throw new Error (`User already made purchase ${payment_id}`);
    const newPurchases = [...userToUpdate.purchases, purchase]
    userToUpdate.purchases = newPurchases;
  }
  await userToUpdate.update(username, credits, role, isActive);
  await userToUpdate.save();
  return userToUpdate;
};

const deleteUserById = async (id) => {
  const userToDestroy = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
      through: { attributes: [] }
    },
  });
  if (!userToDestroy) throw new Error (`User with id ${id} not found in database`);
  await userToDestroy.destroy();
  const remainingUsers = await users.findAll();
  return remainingUsers;
};

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
