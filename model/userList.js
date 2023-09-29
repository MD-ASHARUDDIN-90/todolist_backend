import mongoose from "mongoose";
import validator from "validator";
const { Schema, model } = mongoose;

const userListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export const UserList = model("UserList", userListSchema);
