const { Router } = require("express");
const {
  userRegister,
  userLogin,
  getUser,
  userUpdate,
  userDelete,
} = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/users/register", userRegister);
userRouter.post("/users/login", userLogin);
userRouter.get("/users", getUser);
userRouter.put("/users/:id", userUpdate);
userRouter.delete("/users/:id", userDelete);

module.exports = userRouter;
