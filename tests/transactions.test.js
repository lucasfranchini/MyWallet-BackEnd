import "../src/setup.js";
import supertest from "supertest";
import app from "../src/app";
import connection from "../src/database";

let token;

beforeAll(async () => {
  await connection.query(`DELETE FROM users`);
  const body = {
    email: "123@teste.com",
    password: "456",
    name: "789",
  };
  await supertest(app).post("/sign-up").send(body);
  const result = await supertest(app).post("/sign-in").send(body);
  token = result.body.token;
});

afterAll(async () => {
  await connection.query(`DELETE FROM transactions`);
  await connection.query(`DELETE FROM users`);
  await connection.query(`DELETE FROM sessions`);
  connection.end();
});

describe("POST /transactions", () => {
  it("returns status 201 for valid params", async () => {
    const body = {
      value: 3000,
      description: "teste",
      type: "expense",
    };
    const result = await supertest(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(201);
  });
  it("returns status 400 for invalid type", async () => {
    const body = {
      value: 3000,
      description: "teste",
      type: "outcome",
    };
    const result = await supertest(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });

  it("returns status 400 for float value", async () => {
    const body = {
      value: 30.55,
      description: "teste",
      type: "income",
    };
    const result = await supertest(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });
  it("returns status 400 for empty boddy", async () => {
    const body = {};
    const result = await supertest(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(result.status).toEqual(400);
  });
  it("returns status 401 for empty token", async () => {
    const body = {
      value: 3000,
      description: "teste",
      type: "outcome",
    };
    const result = await supertest(app).post("/transactions").send(body);
    expect(result.status).toEqual(401);
  });
});

describe("GET /transactions", () => {
  it("returns an array for valid token", async () => {
    const result = await supertest(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(result.body.length).toBeGreaterThanOrEqual(0);
  });
  it("returns an array for empty token", async () => {
    const result = await supertest(app).get("/transactions");
    expect(result.status).toEqual(401);
  });
  it("returns an array for invalid token", async () => {
    const result = await supertest(app)
      .get("/transactions")
      .set("Authorization", `Bearer token`);
    expect(result.status).toEqual(401);
  });
});
