import { Router } from "express";
import transactionController from "../controller/transactionController";

const transactionRouter = Router();
const { addTransaction } = transactionController;

// Routes for the Product Router
transactionRouter.post("/", addTransaction); // Add new User

export default transactionRouter;
