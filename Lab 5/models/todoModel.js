const mongoose = require("mongoose");
//const autoIncrement = require("mongoose-sequence")(mongoose);

const todoSchema = new mongoose.Schema({
  //_id: { type: Number },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minlength: 5, maxlength: 20 , trim : true},
  status: { type: String, enum: ['to-do', 'in-progress', 'done'], default: 'to-do' },
  tags: [{ type: String, maxlength: 10 }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

//todoSchema.plugin(autoIncrement, { inc_field: "_id" });
const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
