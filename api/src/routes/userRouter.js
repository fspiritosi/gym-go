const { Router } = require("express");
const {
  userRegisterHandler,
  userLoginHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  updateUserByEmailHandler,
  deleteUserByIdHandler,
} = require("../handlers/userHandler");

const userRouter = Router();

userRouter.post("/register", userRegisterHandler);
userRouter.post("/login", userLoginHandler);
userRouter.get("/", getAllUsersHandler);
userRouter.get("/:id", getUserByIdHandler);
userRouter.put("/:id", updateUserByIdHandler);
userRouter.put("/", updateUserByEmailHandler);
userRouter.delete("/:id", deleteUserByIdHandler);

module.exports = userRouter;
