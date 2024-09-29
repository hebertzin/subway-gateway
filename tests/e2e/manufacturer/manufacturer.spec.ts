import supertest from "supertest";
import { describe, expect, it } from "vitest";
import { ExpressApp as app } from "../../../src/app";
import { HttpStatusCode } from "../../../src/domain/http";

describe("POST /manufacturer", () => {
  it("Should create a manufacturer with valid data", async () => {
    const manufacturerData = {
      name: "Hebert santos",
      phone: "13996612070",
      email: "hebertsantosdeveloper@gmail.com",
      street: "Rua campinas",
      number: "602",
      city: "praia grande",
      state: "sp",
      zip_code: "11714140",
      website: "https://www.hebertzin.com/",
    };
    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(manufacturerData)
      .expect(HttpStatusCode.Created);
    expect(response.body).toMatchObject({
      data: {
        msg: "Manufacturer created successfully",
        statusCode: HttpStatusCode.Created,
        body: expect.objectContaining({
          name: manufacturerData.name,
          phone: manufacturerData.phone,
          email: manufacturerData.email,
          street: manufacturerData.street,
          number: manufacturerData.number,
          city: manufacturerData.city,
          state: manufacturerData.state,
          zip_code: manufacturerData.zip_code,
          website: manufacturerData.website,
        }),
      },
    });
  });

  it("Should return an error if email is missing", async () => {
    const incompleteData = {
      name: "TechCorp",
      phone: "1234567890",
      email: "",
      street: "Main Street",
      number: "123",
      city: "Tech City",
      state: "TX",
      zip_code: "12345",
      website: "https://www.techcorp.com",
    };
    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);
    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        expect.objectContaining({ message: "Invalid email address" }),
        expect.objectContaining({ message: "Email is required" }),
      ]),
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });

  it("Should return an error if email is invalid", async () => {
    const incompleteData = {
      name: "TechCorp",
      phone: "1234567890",
      email: "invalidemail.com",
      street: "Main Street",
      number: "123",
      city: "Tech City",
      state: "TX",
      zip_code: "12345",
      website: "https://www.techcorp.com",
    };
    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);
    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        expect.objectContaining({ message: "Invalid email address" }),
      ]),
    });
  });

  it("Should return an error if zip code is invalid", async () => {
    const incompleteData = {
      name: "TechCorp",
      phone: "1234567890",
      email: "hebertsantosdeveloper@gmail.com",
      street: "Main Street",
      number: "123",
      city: "Tech City",
      state: "TX",
      zip_code: "000000000",
      website: "https://www.techcorp.com",
    };
    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);
    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        expect.objectContaining({
          message: "Zip code must be in the format XXXXX-XXX",
        }),
      ]),
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });

  it("Should return an error if phone number is invalid", async () => {
    const incompleteData = {
      name: "TechCorp",
      phone: "48",
      email: "hebertsantosdeveloper@gmail.com",
      street: "Main Street",
      number: "123",
      city: "Tech City",
      state: "TX",
      zip_code: "11714140",
      website: "https://www.techcorp.com",
    };

    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);
    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        expect.objectContaining({
          message:
            "Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX",
        }),
      ]),
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });

  it("Should return an error if website address is invalid", async () => {
    const incompleteData = {
      name: "TechCorp",
      phone: "13996612070",
      email: "hebertsantosdeveloper@gmail.com",
      street: "Main Street",
      number: "123",
      city: "Tech City",
      state: "TX",
      zip_code: "11714140",
      website: "techcorp.com",
    };

    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);

    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        expect.objectContaining({
          message: "Must be a valid URL",
        }),
      ]),
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });

  it("Should return any errors in any field passed", async () => {
    const incompleteData = {
      name: "",
      phone: "",
      email: "",
      street: "",
      number: "",
      city: "",
      state: "",
      zip_code: "",
      website: "",
    };

    const response = await supertest(new app().getApp())
      .post("/api/v1/manufacturer")
      .send(incompleteData)
      .expect(HttpStatusCode.BadRequest);
    expect(response.body).toMatchObject({
      error: "Invalid data",
      details: expect.arrayContaining([
        { message: "Name is required" },
        { message: "Phone number must be at least 10 digits" },
        {
          message:
            "Phone number must be in the format (XX) XXXXX-XXXX or (XX) XXXX-XXXX",
        },
        { message: "Invalid email address" },
        { message: "Email is required" },
        { message: "Street is required" },
        { message: "Number is required" },
        { message: "City is required" },
        { message: "State must be a 2-letter code" },
        { message: "Zip code must be at least 8 characters" },
        { message: "Zip code must be in the format XXXXX-XXX" },
        { message: "Must be a valid URL" },
        { message: "URL is required" },
      ]),
    });
    expect(Array.isArray(response.body.details)).toBe(true);
  });
});
