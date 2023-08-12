import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/user";

const api = request(app);

let user1: any;
let user2: any;

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  user1 = await User.create({
    firstName: "User",
    lastName: "One",
    balance: 5000,
  });
  user2 = await User.create({
    firstName: "User",
    lastName: "Two",
    balance: 5000,
  });
});

describe("Transactions:", () => {
  describe("Should Work with", () => {
    it("complete valid Details.", async () => {
      const response = await api
        .post("/api/transactions/")
        .send({ senderId: user1._id, receiverId: user2._id, amount: 1000 });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.senderId).toBe(user1._id.toString());
      expect(response.body.receiverId).toBe(user2._id.toString());
      expect(response.body.amount).toBe(1000);
      expect(response.body).toHaveProperty("createdAt");
    });
  });

  describe("Should not Work with", () => {
    it("invalid Sender or Receiver IDs.", async () => {
      const response = await api
        .post("/api/transactions/")
        .send({ senderId: "hkafgdsf", receiverId: "flhdsakjf", amount: 1000 });

      expect(response.statusCode).toBe(400);
    });

    it("insufficient balance for the sender.", async () => {
      const response = await api
        .post("/api/transactions/")
        .send({ senderId: user1._id, receiverId: user2._id, amount: 6000 });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: "Sender has insufficient Balance.",
      });
    });

    it("invalid or zero transaction amount.", async () => {
      const response = await api
        .post("/api/transactions/")
        .send({ senderId: user1._id, receiverId: user2._id, amount: -500 });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: "Minimum amount for a transaction is 1 Tucos.",
      });
    });

    it("non-existing sender or receiver.", async () => {
      await User.deleteMany({});
      const response = await api
        .post("/api/transactions/")
        .send({ senderId: user1._id, receiverId: user2._id, amount: 1000 });

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        message: "Sender or receiver not found",
      });
    });
  });
});
