import { Router } from "express";
import userController from "../controller/userController";

const usersRouter = Router();
const { getUsers, addUser, getUser } = userController;

// Routes for the Product Router
usersRouter.get("/", getUsers); // Get All Users
usersRouter.get("/:id", getUser);// Get User by ID
usersRouter.post("/", addUser);// Add new User

export default usersRouter;
