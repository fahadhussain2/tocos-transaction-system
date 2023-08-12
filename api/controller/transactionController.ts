import { Request, Response } from "express";
import mongoose from "mongoose";
import Transaction from "../models/transaction";
import User from "../models/user";

interface TransactionController {
  addTransaction: (req: Request, res: Response) => Promise<void>;
}

const transactionController: TransactionController = {
  addTransaction: async (req, res) => {
    try {
      const newTransaction = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(newTransaction.senderId) ||
        !mongoose.Types.ObjectId.isValid(newTransaction.receiverId)
      ) {
        res.status(400).json({ message: "Invalid Sender or Receiver ID format." });
        return;
      }
      if (
        !newTransaction.senderId ||
        !newTransaction.receiverId ||
        !newTransaction.amount
      ) {
        res.status(400).json({ message: "Missing Required Fields" });
        return;
      }

      if (newTransaction.senderId === newTransaction.receiverId) {
        res.status(400).json({ message: "Sender and Receiver cannot be same" });
        return;
      }

      const sender = await User.findById(newTransaction.senderId);
      const receiver = await User.findById(newTransaction.receiverId);

      if (!sender || !receiver) {
        res.status(404).json({ message: "Sender or receiver not found" });
        return;
      }

      if (sender.balance < newTransaction.amount) {
        res.status(400).json({ message: "Sender has insufficient Balance." });
        return;
      }

      if (newTransaction.amount <= 0) {
        res
          .status(400)
          .json({ message: "Minimum amount for a transaction is 1 Tucos." });
        return;
      }

      const addedTransaction = await Transaction.create(newTransaction);

      // Update sender and receiver balances
      sender.balance -= newTransaction.amount;
      receiver.balance += newTransaction.amount;

      // Update Sender and Receiver Transactions
      sender.transactions.push(addedTransaction.id);
      receiver.transactions.push(addedTransaction.id);

      await sender.save();
      await receiver.save();

      res.status(201).json(addedTransaction);
    } catch (error) {
      res
        .status(400)
        .json({ message: "An error occurred adding new transaction." });
    }
  },
};

export default transactionController;
