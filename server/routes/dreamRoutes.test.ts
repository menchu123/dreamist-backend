/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import Debug from "debug";
import chalk from "chalk";
import mongoose from "mongoose";
import supertest from "supertest";
import initializeDB from "../../database";
import Dream from "../../database/models/dream";
import { initializeServer, app } from "../index";

const request = supertest(app);
const debug = Debug("dreamist:dreams:routes:tests");
let server;
let token;

beforeAll(async () => {
  await initializeDB(process.env.MONGODB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
  const loginResponse = await request
    .post("/users/login")
    .send({
      username: "soñandosoñandotriunfepatinando",
      password: "sueñis",
    })
    .expect(200);
  token = loginResponse.body.token;
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Connexion to database ended"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Connexion to server ended"));
  });
  await server.close();
  Dream.deleteMany();
});

describe("Given a /user-dreams endpoint", () => {
  describe("When a GET request arrives with a correct token", () => {
    test("Then it should send a response with an (empty in this case) array of dreams and a status code of 200", async () => {
      const { body } = await request
        .get("/dreams/user-dreams")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual([]);
    });
  });
  describe("When a GET request arrives without a token", () => {
    test("Then it should send a response with a 401 error", async () => {
      await request.get("/dreams/user-dreams").expect(401);
    });
  });
});

describe("Given a /user-dreams/new endpoint", () => {
  describe("When a POST request arrives with a correct token", () => {
    test("Then it should send a response with the new dream and a status code of 200", async () => {
      const { body } = await request
        .post("/dreams/user-dreams/new")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Sueño ilustrado",
          description: "AAAAAAAAAAAAAHHHHHHHH",
          mood: 1,
        })
        .expect(200);

      expect(body).toHaveProperty("title", "Sueño ilustrado");
    });
  });
});
