import jwt from "jsonwebtoken";
import { createError } from "../error.js";

// Define your secret key directly
const JWT_SECRET = " Rohit Metha  ";

export const verifyToken = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return next(createError(401, "You are not authenticated!"));

    // Verify the token using the secret key
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode; // Attach the decoded user information to the request

    return next(); // Proceed to the next middleware or route handler
  } catch (err) {
    next(err); // Pass any errors to the error handling middleware
  }
};
