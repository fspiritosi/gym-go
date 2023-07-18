const { users, Events } = require("../db");
const { token } = require("../utils/jwt");
const { registerEmail } = require("../utils/nodemailer");

const userRegister = async (username, email) => {
  const userFound = await users.findOne({ where: { email: email } });
  if (userFound) {
    return null;
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
      attributes: ["id", "date", "startTime", "endTime", "ClassId"],
      through: { attributes: [] },
    },
  });
  return allUsers;
};

const getUserByEmail = async (email) => {
  const user = await users.findOne({ where: { email: email } });
  if (!user) throw new Error(`User with email ${email} not found`);
  return user;
};

const getUserById = async (id) => {
  const user = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ["id", "date", "startTime", "endTime", "ClassId"],
      through: { attributes: [] },
    },
  });
  if (!user) throw new Error(`User with id ${id} not found`);
  return user;
};

const updateUserById = async (id, body) => {
  const userToUpdate = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ["id", "date", "startTime", "endTime", "ClassId"],
      through: { attributes: [] },
    },
  });
  if (!userToUpdate) throw new Error(`User with id ${id} not found`);
  await userToUpdate.update(body);
  return userToUpdate;
};

const updateUserByEmail = async (email, body) => {
  if (!email) throw new Error(`Must send an email via query parameter`);
  const userToUpdate = await users.findOne({
    where: { email: email },
    include: {
      model: Events,
      attributes: ["id", "date", "startTime", "endTime", "ClassId"],
      through: { attributes: [] },
    },
  });
  if (!userToUpdate) throw new Error(`User with email ${email} not found`);
  await userToUpdate.update(body);
  return userToUpdate;
};

const deleteUserById = async (id) => {
  const userToDestroy = await users.findByPk(id);
  if (!userToDestroy) return null;
  await userToDestroy.destroy();
  const remainingUsers = await users.findAll();
  return remainingUsers;
};

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
  updateUserByEmail,
  deleteUserById,
};
