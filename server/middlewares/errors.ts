import Debug from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";
import { Request, Response } from "express";

const debug = Debug("dreamist:errors");

export const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

export const errorHandler = (
  error: {
    message: string;
    code: number;
    statusCode?: number;
  },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  debug(chalk.red("An error has occurred: ", error.message));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Bad romance";
  }
  const message = error.code ? error.message : "Idk what to tell you man";
  res.status(error.code || 500).json({ error: message });
};
