const Todo = require("./../models/todoModel");
const path = require("path");



const addTodo = async (req, res) => {
  const newTodo = new Todo(req.body);
  const [err, todo] = await asyncWrapper(newTodo.save());
  if (!err) {
    res.status(201).json({
      status: "success",
      data: {
        todo: todo,
      },
    });
  }else{
    res.status(400).send(err.message);
  }
};

const editTodo = async (req, res) => {
    req.body.updatedAt = new Date();
    const [err, updatedTodo] = await asyncWrapper(Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }));
    if(!err){
      res.send(updatedTodo);
    } else{
      res.status(400).send(err.message);
    }
};

const deleteTodo = async (req, res) => {

  const [err] = await asyncWrapper(Todo.findByIdAndDelete(req.params.id))
  if(!err){
    res.sendStatus(204);
  } else{
    res.status(500).send(err.message);
  }

};

const getTodos = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const skip = parseInt(req.query.skip) || 0;
  const status = req.query.status;
  let err, todos;

  if (status) {
    [err, todos] = await asyncWrapper(Todo.find({ status: status }).limit(limit).skip(skip));
  } else {
    [err, todos] = await asyncWrapper(Todo.find().limit(limit).skip(skip));
  }

  if (!err) {
    //  res.send(todos);
    const indexPath = path.join(__dirname, "../views/index");
    res.render(indexPath, { todos });
  } else {
    res.status(500).send(err.message);
  }
};


module.exports = {
  addTodo,
  editTodo,
  deleteTodo,
  getTodos,
};
