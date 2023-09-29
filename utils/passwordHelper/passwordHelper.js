import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  // Hash the password
  const saltRounds = 10; // You can adjust the number of salt rounds for security
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const validatePassword = (password) => {
  // Define regular expressions to check for specific password requirements
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[@$!%*?&]/;

  // Create an array to store missing requirements
  const missingRequirements = [];

  // Check for each requirement and add missing ones to the array
  if (!lowercaseRegex.test(password)) {
    missingRequirements.push("At least one lowercase letter required");
  }
  if (!uppercaseRegex.test(password)) {
    missingRequirements.push("At least one uppercase letter required");
  }
  if (!digitRegex.test(password)) {
    missingRequirements.push("At least one numerical value required");
  }
  if (!specialCharRegex.test(password)) {
    missingRequirements.push(
      "At least one special character (@, $, !, %, *, ?, or &) required"
    );
  }

  // Determine if the password is valid or not
  const isValid = missingRequirements.length === 0;

  // Return an object with validation result and missing requirements
  return {
    isValid,
    missingRequirements,
  };
};

export const comparePassword = async (dbPassword, password) => {
  const passwordMatch = await bcrypt.compare(password, dbPassword);
  return passwordMatch;
};
