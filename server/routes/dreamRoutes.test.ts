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

beforeEach(async () => {
  await Dream.deleteMany();
  await Dream.create([
    {
      type: "normal",
      title: "pesadilla infernal",
      description: "backend en typescript",
      mood: 5,
      image: "aaa",
      drawing: "aaa",
      date: "2021-11-24T10:51:37.828Z",
      id: "619e19396746b082b9421972",
      __v: 0,
    },
    {
      type: "normal",
      title: "Sueño ilustrado",
      description: "AAAAAAAAAAAAAHHHHHHHH",
      mood: 1,
      image:
        "https://storage.googleapis.com/dreamist-be502.appspot.com/iconPiolinGrosero-1637830191241-.png",
      date: "2021-11-25T08:49:51.787Z",
      id: "619f4e2fc3abc5b958dc2fc1",
      __v: 0,
    },
  ]);
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
});
