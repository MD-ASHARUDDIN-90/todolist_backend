import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todolistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  date: { type: Date, default: Date.now },
});

export const TodoList = model("TodoList", todolistSchema);
