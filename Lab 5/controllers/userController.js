const User = require("./../models/userModel");
const Todo = require("./../models/todoModel")
const path = require("path");


const asyncWrapper = (promise) =>
  promise.then((data) => [undefined, data]).catch((error) => [error]);

const getUsers = async (req, res) => {

  const [err, users] = await asyncWrapper(User.find({}, 'firstName'))
  if(!err){
    res.send(users);
  } else{
    res.status(500).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  const [err] = await asyncWrapper(User.findByIdAndDelete(req.params.id))
  if(!err){
    res.sendStatus(204);
  } else{
    res.status(500).send(err.message);
  }
};

const editUser = async (req, res) => {
  const [err, updatedUser] = await asyncWrapper( User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }))
  if(!err){
    res.send({ user: updatedUser })
  } else{
    res.status(400).send(err.message);
  }
};




const getUserTodos = async (req, res) => {
  const [err, todos] = await asyncWrapper(Todo.find({ userId: req.params.userId }))
  if(!err){
    //res.send(usersTodos);
    const indexPath = path.join(__dirname, "../views/index");
    res.render(indexPath, { todos });
  } else{
    res.status(500).send(err.message);
  }
}





module.exports = {
    getUsers,
    deleteUser,
    editUser,
    getUserTodos
  };
  