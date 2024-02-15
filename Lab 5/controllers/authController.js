
const jwt = require('jsonwebtoken')
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE });
}

const asyncWrapper = require("../lib/lib");

const signUp = async (req, res) => {
  const newUser = new User(req.body);
  const [err] = await asyncWrapper(newUser.save());
  if (!err) {
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } else {
    res.status(400).send(err.message);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "please provide email or password" });
  }
  const [err, user] = await asyncWrapper(User.findOne({ username }));

  const correct = await user.verifyPassword(password);
  if (!user || !correct) {
    return res.status(401).send({ message: "authentication failed" });
  }
  const token = signToken(user._id);
  res.status(201).json({
    status: "success",
    token: token,
  });
};

const protect = async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).send(err.message);
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(401).send({ message: "you are not logged in" });
  }
  next()
};

const isTodoOwner = async (req, res, next) => {
  const todoId = req.params.todoId;
  const userId = req.user.id;

  const todo = await Todo.findById(todoId);
  if (todo && todo.userId === userId) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "forbidden, you do not own this todo" });
  }
};

module.exports = {
  signUp,
  login,
  protect,
  isTodoOwner,
};
