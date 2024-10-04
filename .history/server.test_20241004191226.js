const request = require("supertest");
const { app, server } = require("./server");

describe("Server", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("responds to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Hello World");
  });
});
