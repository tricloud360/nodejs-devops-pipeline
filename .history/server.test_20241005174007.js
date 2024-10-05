const request = require("supertest");
const { app, startServer } = require("./server");

describe("Server", () => {
  let server;

  beforeAll(() => {
    server = startServer();
  });

  afterAll((done) => {
    server.close(done);
  });

  it("responds to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Hello World");
  });
});
