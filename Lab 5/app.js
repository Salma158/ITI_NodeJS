const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });

const app = express();
const PORT = 3000;
const todoRouter = require("./routes/todoRouter");
const userRouter = require("./routes/userRouter");
const path = require("path");

const staticFile = path.join(__dirname, 'public')
app.use(express.static(staticFile));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use("/todos", todoRouter);
app.use("/users", userRouter);

const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(console.log("successfully connected"))
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});