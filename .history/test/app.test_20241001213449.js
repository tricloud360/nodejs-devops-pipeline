const request = require("supertest");
const app = require("../app");

describe("GET /", () => {
  it("responds with welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Welcome to our Node.js application!"
    );
  });
});

describe("GET /api/status", () => {
  it("responds with status OK", async () => {
    const response = await request(app).get("/api/status");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("timestamp");
  });
});
