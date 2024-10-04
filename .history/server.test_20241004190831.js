const request = require("supertest");
const app = require("./server");

describe("Server", () => {
  it("responds to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Hello World");
  });
});
