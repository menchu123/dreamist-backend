import Debug from "debug";
import chalk from "chalk";
import { Request, Response, NextFunction } from "express";
import IError from "../../interfaces/error";

const debug = Debug("dreamist:errors");

export const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const errorHandler = (
  error: IError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  debug(chalk.red("An error has occurred: ", error.message));
  if (error.statusCode === 400) {
    error.code = 400;
    error.message = "Bad romance";
  }
  const message = error.code ? error.message : "Idk what to tell you man";
  res.status(error.code || 500).json({ error: message });
};
