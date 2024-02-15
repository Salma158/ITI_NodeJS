const mongoose = require("mongoose");
// install it
const bcrypt = require('bcrypt');

//const autoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema(
 // _id: { type: Number },
 {
  username: { type: String, required: true, unique: true, minlength: 8 , trim: true},
  firstName: { type: String, required: true, minlength: 3, maxlength: 15 , trim: true },
  lastName: { type: String, required: true, minlength: 3, maxlength: 15 , trim: true},
  password:{type: String, required: true, minlength: 8},
  dob: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
 },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.password = undefined;
        return ret;
      },
    },
  },
);

//  userSchema.plugin(autoIncrement, { inc_field: "_id" });

userSchema.pre('save', async function preSave() {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};


const User = mongoose.model("User", userSchema);
module.exports = User;
