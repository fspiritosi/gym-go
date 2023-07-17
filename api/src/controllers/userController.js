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
        attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
        through: { attributes: [] }
    },
  });
  return allUsers;
};

const getUserById = async (id) => {
  const user = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
      through: { attributes: [] }
    }
  });
  return user;
};

const updateUserById = async (id, body) => {
  const userToUpdate = await users.findByPk(id, {
    include: {
      model: Events,
      attributes: ['id', 'date', 'startTime', 'endTime', 'ClassId'],
      through: { attributes: [] }
    }
  });
  if (!users) return null;
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
  getUserById,
  updateUserById,
  deleteUserById,
};
