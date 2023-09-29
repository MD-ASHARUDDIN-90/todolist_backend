import { compare } from "bcrypt";
import { UserList } from "../../model/userList.js";
import {
  comparePassword,
  hashPassword,
  validatePassword,
} from "../../utils/passwordHelper/passwordHelper.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(403)
        .json({ error: "Name, email, and password are required" });
    }

    const { isValid, missingRequirements } = validatePassword(password);
    if (!isValid) {
      return res.status(403).json(missingRequirements);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserList({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const result = await newUser.save();
    console.log("User saved:", result);
    res.json(result);
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(403).json({ error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by their email in the database
    const user = await UserList.findOne({ email });

    // If the user is not found, return null (user does not exist)
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("db pw", user.password);
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await comparePassword(user.password, password);
    console.log(passwordMatch);

    // If the passwords match, return the user; otherwise, return null (password is incorrect)
    if (passwordMatch) {
      return res.send(user);
    } else {
      return res.status(404).json({ error: "password mismatch" });
    }
  } catch (error) {
    // Handle any errors that may occur during the verification process
    console.error("Error verifying user:", error);
    throw error;
  }
};
