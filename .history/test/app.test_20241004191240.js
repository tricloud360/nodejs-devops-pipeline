const request = require("supertest");
const { app } = require("../server");

describe("GET /", () => {
  it("responds with welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Hello World from NodeJS DevOps Pipeline");
  });
});
