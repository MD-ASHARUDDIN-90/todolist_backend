import express from "express";
import {
  createUser,
  verifyUser,
  getAllUsers,
} from "../../controller/userList/userList.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", verifyUser);
router.get("/", getAllUsers);

export default router;
