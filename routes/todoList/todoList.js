import express from "express";
import { createTodo, getAllTodo } from "../../controller/todoList/todoList.js";

const router = express.Router();

router.get("/", getAllTodo);

router.post("/create", createTodo);

export default router;
