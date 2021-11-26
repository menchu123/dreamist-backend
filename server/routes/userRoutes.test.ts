/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import Debug from "debug";
import bcrypt from "bcrypt";
import chalk from "chalk";
import mongoose from "mongoose";
import supertest from "supertest";
import initializeDB from "../../database";
import User from "../../database/models/user";
import { initializeServer, app } from "../index";

const request = supertest(app);
const debug = Debug("dreamist:user:routes:tests");
let server;

beforeAll(async () => {
  await initializeDB(process.env.MONGODB_STRING_TEST);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  await User.deleteMany();
  await User.create({
    _id: "618abb613c10e9728eef559a",
    __v: 0,
    name: "Soñador",
    username: "soñandosoñandotriunfepatinando",
    password: await bcrypt.hash("sueñis", 10),
  });
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
});

describe("Given a /login endpoint", () => {
  describe("When a POST request arrives with a bad username and password", () => {
    test("Then it should respond with a 401 error", async () => {
      const { body } = await request
        .post("/users/login")
        .send({ username: "a", password: "a" })
        .expect(401);

      const expectedError = {
        error: "Wrong credentials",
      };

      expect(body).toEqual(expectedError);
    });
  });
  describe("When a POST request arrives with a correct username and password", () => {
    test("Then it should respond with a 200", async () => {
      const { body } = await request
        .post("/users/login")
        .send({
          username: "soñandosoñandotriunfepatinando",
          password: "sueñis",
        })
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });
});
describe("Given a /register endpoint", () => {
  describe("When a POST request arrives with an already existing username", () => {
    test("Then it should respond with a 400 error", async () => {
      const { body } = await request
        .post("/users/register")
        .send({
          username: "soñandosoñandotriunfepatinando",
          password: "sueñis",
          name: "Soñador",
        })
        .expect(400);

      const expectedError = {
        error: "Username already taken",
      };

      expect(body).toEqual(expectedError);
    });
  });
  describe("When a POST request arrives with a non existent username, a name and a password", () => {
    test("Then it should respond with a 200", async () => {
      await request
        .post("/users/register")
        .send({
          username: "soñandosoñandotriunfepatinandoAGAIN",
          password: "sueñis",
          name: "Soñador",
        })
        .expect(200);
    });
  });
});
