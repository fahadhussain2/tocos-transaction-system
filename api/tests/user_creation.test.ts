import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

const api = request(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Creation:", () => {
  it("Should create a new user", async () => {
    const response = await api
      .post("/api/users")
      .send({ firstName: "John", lastName: "Doe", balance: 100 });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.firstName).toBe("John");
    expect(response.body.lastName).toBe("Doe");
    expect(response.body.balance).toBe(100);
    expect(response.body).toHaveProperty("transactions");
  });

  describe("Should not create a new user", () => {
    it("without all required parameters", async () => {
      const response = await api.post("/api/users").send({});
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toEqual("Missing Required Fields")
    });
  
    it("if missing any of required parameter", async () => {
      const response = await api
        .post("/api/users")
        .send({ firstName: "John", lastName: "Doe" });
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toEqual("Missing Required Fields")
    });
  
    it("if the minimum balance is less than or equal to 0", async () => {
      const response = await api
        .post("/api/users")
        .send({ firstName: "John", lastName: "Doe", balance: 0 });
  
      expect(response.statusCode).toBe(406);
      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toEqual("Initial Balance should be atleast 1 tocos.")
    });
  })
});
