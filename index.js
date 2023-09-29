import express from "express";
import { connectDB } from "./db.js";
import todoList from "./routes/todoList/todoList.js";
import userList from "./routes/userList/userList.js";

const port = process.env.PORT || 8080; // Use the provided PORT environment variable or default to 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectDB(); // connect to database

const app = express();

app.use(express.json()); //middleware to read req.body

app.use("/api/todolist", todoList); //middleware to route routes
app.use("/api/user", userList); //middleware to route routes

app.get("/", (req, res) => {
  res.json("success");
});

app.listen(port, () => {
  console.log("server run");
});
