import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { ExpressApp as app } from "../../../src/app";
import { HttpStatusCode } from "../../../src/domains/http";
import { mockUser } from "../../mocks/user-mock";

describe("POST /api/v1/users", () => {
  it("Should create users correclty with password hash", async () => {
    const response = await supertest(new app().getApp())
      .post("/api/v1/users")
      .send(mockUser)
      .expect(HttpStatusCode.Created);
    expect(response.body).toMatchObject({
      message: "User created successfully",
      statusCode: HttpStatusCode.Created,
      data: expect.objectContaining({
        id: expect.any(String),
        username: mockUser.username,
        city: mockUser.city,
        country: mockUser.country,
        date_of_birth: mockUser.date_of_birth,
        email: mockUser.email,
        gender: mockUser.gender,
        languages: mockUser.languages,
        nationality: mockUser.nationality,
        phone: mockUser.phone,
        postal_code: mockUser.postal_code,
        state: mockUser.state,
        street: mockUser.street,
        role_id: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    });
  });

  it("should return error if user already exist", async () => {
    const userAlreadyExist = {
      ...mockUser,
      email: "hebertsantosdeveloper@gmail.com",
    };
    const response = await supertest(new app().getApp())
      .post("/api/v1/users")
      .send(userAlreadyExist)
      .expect(HttpStatusCode.Conflict);

    expect(response.body).toMatchObject({
      message: "User already exists",
      statusCode: HttpStatusCode.Conflict,
    });
  });

  it("Should return validation errors for invalid user data", async () => {
    const incompleteData = {
      username: "",
      password: "",
      email: "",
      phone: "",
      street: "",
      country: "",
      nationality: "",
      state: "",
      city: "",
      postal_code: "",
      gender: "",
      date_of_birth: "",
      languages: "",
    };

    const response = await supertest(new app().getApp())
      .post("/api/v1/users")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);

    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        { message: "Username is required" },
        { message: "Password must be at least 6 characters long" },
        { message: "Invalid email address" },
        { message: "Email is required" },
        { message: "Phone number must be at least 10 digits" },
        {
          message:
            "Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX",
        },
        { message: "Street is required" },
        { message: "Country is required" },
        { message: "Nationality is required" },
        { message: "City is required" },
        { message: "Postal code must be at least 5 characters long" },
        { message: "Postal code must be in the format XXXXX-XXX" },
        { message: "Gender is required" },
        { message: "Date of birth must be in the format DD/MM/YY" },
        { message: "Languages is required" },
      ]),
    });
  });
});

describe("GET /api/v1/users", () => {
  it("Should return all users", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users")
      .expect(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.users).toHaveLength(20);
  });

  it("Should return all users with pagination params", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?page=2&limit=10")
      .expect(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(response.body.data.page).toBe(2);
    expect(response.body.data.users).toHaveLength(10);
    expect(Array.isArray(response.body.data.users)).toBe(true);
  });

  it("Should return user by username", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?username=camila")
      .expect(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.users[0].username).toBe("Camila");
    expect(response.body.data.page).toBe(1);
  });

  it("Should return users by city", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?city=são paulo")
      .expect(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.users[0].city).toBe("São Paulo");
    expect(response.body.data.page).toBe(1);
  });

  it("Should return users by gender", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?gender=feminino")
      .expect(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.users[0].gender).toBe("Feminino");
    expect(response.body.data.page).toBe(1);
  });

  it("Should return users by country", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?country=brasil")
      .expect(HttpStatusCode.Ok);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.users[0].country).toBe("Brasil");
    expect(response.body.data.page).toBe(1);
  });

  it("Should return users by state", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?state=bahia")
      .expect(HttpStatusCode.Ok);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.page).toBe(1);
  });

  it("Should return users by email", async () => {
    const response = await supertest(new app().getApp())
      .get("/api/v1/users?email=hebertsantosdeveloper@gmail.com")
      .expect(HttpStatusCode.Ok);

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data).toHaveProperty("hasNextPage");
    expect(response.body.data).toHaveProperty("hasPreviousPage");
    expect(response.body.data).toHaveProperty("page");
    expect(response.body.data).toHaveProperty("pageSize");
    expect(response.body.data).toHaveProperty("totalPages");
    expect(response.body.data).toHaveProperty("totalItems");
    expect(Array.isArray(response.body.data.users)).toBe(true);
    expect(response.body.data.users[0].email).toBe(
      "hebertsantosdeveloper@gmail.com"
    );
    expect(response.body.data.page).toBe(1);
  });
});
