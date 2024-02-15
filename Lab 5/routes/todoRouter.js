const express = require("express")
const toDoRouter = express.Router()
const authController = require('./../controllers/authController')
const toDoController = require('./../controllers/todoController')


toDoRouter.route('/')
    .post(authController.protect, toDoController.addTodo)
    .get(authController.protect, authController.isTodoOwner, toDoController.getTodos)
    

toDoRouter.route("/:id")
    .patch(authController.protect, authController.isTodoOwner, toDoController.editTodo)
    .delete(authController.protect, authController.isTodoOwner, toDoController.deleteTodo)



module.exports = toDoRouter