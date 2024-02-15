const express = require("express");
const userRouter = express.Router();

const userController = require("./../controllers/userController");
const authController = require('./../controllers/authController')


userRouter.route("/").post(authController.signUp).get(userController.getUsers);

userRouter
  .route("/:id")
  .patch(authController.protect, userController.editUser)
  .delete(userController.deleteUser);

userRouter.route("/:userId/todos").get(authController.protect, userController.getUserTodos)

userRouter.route("/login").post(authController.login)

module.exports = userRouter;
