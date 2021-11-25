import jwt from "jsonwebtoken";
import auth from "./auth";
import NewError from "../../utils/NewError";
import mockRequestPlus from "../../mocks/mockRequestPlus";

jest.mock("jsonwebtoken");

describe("Given an auth middleware", () => {
  describe("When it gets a request with an incorrect Authorization header", () => {
    test("Then it should send an error with a message 'Not authorized sorry' and status 401", () => {
      const req = mockRequestPlus(null, null);

      const next = jest.fn();

      const expectedError = new NewError("Not authorized sorry");

      auth(req, null, next);
      expect(next).toBeCalledWith(expectedError);
    });
  });
  describe("When it gets a request with a Authorization header but without a token", () => {
    test("Then it should send an error with a message 'Token is missing' and status 401", () => {
      const authHeader = "nunu";

      const req = mockRequestPlus(null, authHeader);

      const next = jest.fn();
      const expectedError = new NewError("Token is missing...");

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
  describe("When it gets a request with a Authorization header and it validates", () => {
    test("Then it should add userId and userName to req and call next", () => {
      const req = mockRequestPlus({ userName: "hola" }, "Bearer token");

      const next = jest.fn();

      jwt.verify = jest.fn().mockReturnValue("algo");
      auth(req, null, next);

      expect(req).toHaveProperty("userId");
      expect(req.body).toHaveProperty("userName");
      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it gets a request with a Authorization header but with an incorrect token", () => {
    test("Then it should send an error with a message 'Token no valid' and status 401", () => {
      const req = mockRequestPlus(null, "Bearer token");

      const next = jest.fn();
      const errorSent = new NewError("Token not valid");
      errorSent.code = 401;

      jwt.verify = jest.fn().mockReturnValue(null);
      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(errorSent);
    });
  });
});
