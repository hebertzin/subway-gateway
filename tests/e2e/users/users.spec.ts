import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { ExpressApp as app } from "../../../src/app";
import { HttpStatusCode } from "../../../src/domains/http";
import { mockUser } from "../../mocks/user-mock";

describe("/api/v1/users", () => {
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
        { message: "Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX" },
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
