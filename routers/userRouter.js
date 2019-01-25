// Importing functions from userController
import { autenticate, signup } from "../controllers/userController";
import express from "express";

// create router using express
const userRouter = express.Router();

// Create Routes (url, function)
userRouter.post('/login', autenticate);
    // Create /signup route
userRouter.post('/signup', signup);

// Export userRouter
export default userRouter;