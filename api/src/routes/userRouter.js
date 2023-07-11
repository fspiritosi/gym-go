const { Router } = require("express");
const {
  userRegister,
  userLogin,
  getAllUsers,
  userUpdate,
  userDelete,
} = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/users/register", userRegister);
userRouter.post("/users/login", userLogin);
userRouter.get("/users", getAllUsers);
userRouter.put("/users/:id", userUpdate);
userRouter.delete("/users/:id", userDelete);

module.exports = userRouter;
