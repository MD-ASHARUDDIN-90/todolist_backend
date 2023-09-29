import express from "express";
import { createUser, verifyUser } from "../../controller/userList/userList.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", verifyUser);

export default router;
