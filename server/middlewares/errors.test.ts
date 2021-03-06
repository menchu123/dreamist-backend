import { notFoundErrorHandler, errorHandler } from "./errors";
import mockResponse from "../../mocks/mockResponse";
import mockRequest from "../../mocks/mockRequest";
import IError from "../../interfaces/error";

describe("Given an notFoundErrorHandler middleware,", () => {
  describe("When it gets a request", () => {
    test("Then it should send a response with a 'Endpoint not found' error and a status code of 404", () => {
      const res = mockResponse();
      const expectedError = { error: "Endpoint not found" };
      const req = mockRequest();

      notFoundErrorHandler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given an errorHandler middleware,", () => {
  describe("When it gets a request and an error and no error code", () => {
    test("Then it should send a response with a 'Idk what to tell you man' error and a status code of 500", () => {
      const res = mockResponse();
      const error = new Error("Idk what to tell you man") as IError;
      const req = mockRequest();
      const next = () => {};

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("When it gets a request and a 'Who are you' error with a 401 error code", () => {
    test("Then it should send a response with the error's message and a status code of 401", () => {
      const res = mockResponse();
      const error = new Error("Who are you") as IError;
      error.code = 401;
      const req = mockRequest();
      const next = () => {};

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("When it gets a request and a Validation error", () => {
    test("Then it should send a response with a 'Bad romance' message and a status code of 400", () => {
      const res = mockResponse();

      const error = new Error("Bad romance") as IError;
      error.statusCode = 400;

      const req = mockRequest();
      const next = () => {};

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Bad romance" });
    });
  });
});
