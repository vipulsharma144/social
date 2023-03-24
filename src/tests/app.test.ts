import request from "supertest";
const ROOT = "http://localhost:3000";
let token = "";

beforeAll(async () => {
  const response = await request(ROOT)
    .post("/public/login")
    .send({ email: "jd_1@gmail.com", password: "123456" });

  token = response.body.token;
});

describe("POST /api/auth/register", () => {
  it("should return 400 if email is not provided", async () => {
    const res = await request(ROOT)
      .post("/public/register")
      .send({})
      .expect(400);
  });

  it("should return 400 if password is not provided", async () => {
    const res = await request(ROOT)
      .post("/public/register")
      .send({ email: "jd_1@gmail.com", name: "John Doe" })
      .expect(400);
  });

  it("should return 400 if name is not provided", async () => {
    const res = await request(ROOT)
      .post("/public/register")
      .send({ email: "jd_1@gmail.com", password: "123456" });
  });
});

describe("POST /public/login", () => {
  it("should return 400 if email is not provided", async () => {
    const res = await request(ROOT).post("/public/login").send({}).expect(400);
  });

  it("should return 400 if password is not provided", async () => {
    const res = await request(ROOT)
      .post("/public/login")
      .send({ email: "jd_1@gmail.com" })
      .expect(400);
  });

  it("should return 400 if password is not valid", async () => {
    const res = await request(ROOT)
      .post("/public/login")
      .send({ email: "jd_1@gmail.com", password: "123456" });
  });
});

// test suite to create posts
describe("POST /posts", () => {
  it("should return 401 if user is not authenticated", async () => {
    const res = await request(ROOT)
      .post("/posts")
      .send({ title: "My first post", content: "This is my first post" })
      .expect(401);
  });

  it("should return 400 if title is not provided", async () => {
    const res = await request(ROOT)
      .post("/post")
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "This is my first post" })
      .expect(400);
  });

  it("should return 400 if content is not provided", async () => {
    const res = await request(ROOT)
      .post("/post")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "My first post" })
      .expect(400);
  });
});
