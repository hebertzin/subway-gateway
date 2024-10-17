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
});
