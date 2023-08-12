import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/user";

const api = request(app);

let user: any;

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  user = await User.create({
    firstName: "Test",
    lastName: "User",
    balance: 5000,
  });
});

describe("User Details:", () => {
  it("Get All Details from correct user Id", async () => {
    const response = await api.get("/api/users/" + user._id);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("transactions");
    expect(response.body.firstName).toBe(user.firstName);
    expect(response.body.lastName).toBe(user.lastName);
    expect(response.body.balance).toBe(user.balance);
  });

  it("Get no details if using an invalid Object Id", async () => {
    const response = await api.get("/api/users/" + user._id + "1");

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid user ID format.");
  });

  it("Get no details if using a valid object ID which is an invalid User id", async () => {
    const randomObjectId = new mongoose.Types.ObjectId();
    const response = await api.get("/api/users/" + randomObjectId);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
