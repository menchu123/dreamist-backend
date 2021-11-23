import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";
import { userLogin, userSignUp } from "./userControllers";

dotenv.config();

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

class ErrorCode extends Error {
  code: number | undefined;
}

interface IResponseTest {
  status: () => void;
  json: () => void;
}

const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given an userLogin function", () => {
  describe("When it receives a request with an incorrect username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const usernameTest = "Pablo";

      const req = {
        body: {
          username: usernameTest,
        },
      };

      const res = {};

      User.findOne = jest.fn().mockResolvedValue(false);
      const error: any = new Error("Wrong credentials");
      error.code = 401;
      const next = jest.fn();

      await userLogin(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with an correct username and an incorrect password", () => {
    test("Then it should invoke the next function with an error", async () => {
      const req = {
        body: {
          username: "Luis",
          password: "Wrong password",
        },
      };
      const res = {};
      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "Luis",
        password: "Marta",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const error = new ErrorCode("Wrong credentialss");
      error.code = 401;

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with an correct username and password", () => {
    test("Then it should invoke res.json with an object with a token", async () => {
      const req = {
        body: {
          username: "Luis",
          password: "Marta",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "Luis",
        password: "Marta",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const expectedtoken = "lol";
      jwt.sign = jest.fn().mockReturnValue(expectedtoken);

      const expectedResponse = {
        token: expectedtoken,
      };

      await userLogin(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});

describe("Given an userSignUp function", () => {
  describe("When it receives a request with an existing username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const usernameTest = "Pablo";

      const req = {
        body: {
          username: usernameTest,
        },
      };

      const res = {};

      User.findOne = jest.fn().mockResolvedValue(true);
      const error = new ErrorCode("Username already taken");
      error.code = 400;
      const next = jest.fn();

      await userSignUp(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with a new username", () => {
    test("Then it should respond with a 200 status", async () => {
      const userTest = {
        name: "Luis",
        username: "luis",
        password: "MartaTeQuiero",
      };

      const req = {
        body: userTest,
      };

      const res = mockResponse();

      User.findOne = jest.fn().mockResolvedValue(false);

      await userSignUp(req, res, null);

      expect(res.json).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
