import { TodoList } from "../../model/todolist.js";

export const getAllTodo = async (req, res) => {
  try {
    const todoList = await TodoList.find();
    res.json(todoList);
  } catch (error) {
    console.error("msg", error.message);
    res.status(403).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, body } = req.body;
    const result = await TodoList.create({ title: title, body: body });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("msg", error.message);
    res.status(403).json({ error: error.message });
  }
};
