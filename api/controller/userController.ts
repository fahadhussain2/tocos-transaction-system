import { Request, Response } from "express";
import User from "../models/user";
import mongoose from "mongoose";

interface UserController {
  getUsers: (req: Request, res: Response) => Promise<void>;
  addUser: (req: Request, res: Response) => Promise<void>;
  getUser: (req: Request, res: Response) => Promise<void>;
}

const userController: UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(201).json(users);
    } catch {
      res.status(400).json({ message: "An error getting users." });
    }
  },

  addUser: async (req, res) => {
    try {
      const newUser = req.body;
      if (
        !newUser.firstName ||
        !newUser.lastName ||
        newUser.balance === undefined ||
        newUser.balance === ""
      ) {
        res.status(400).json({ message: "Missing Required Fields" });
        return;
      }
      if (newUser.balance <= 0) {
        res
          .status(406)
          .json({ message: "Initial Balance should be atleast 1 tocos." });
        return;
      }
      const addedUser = await User.create(newUser);
      res.status(201).json(addedUser);
    } catch {
      res.status(400).json({ message: "An error occurred adding new user." });
    }
  },

  getUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Invalid user ID format." });
        return;
      }
      const user = await User.findById(userId).populate("transactions");
      if (!user) {
        res.status(404).json({ message: "User with this id doesnt exist." });
        return;
      }
      res.status(201).json(user);
    } catch {
      res.status(400).json({ message: "An error getting products." });
    }
  },
};

export default userController;
