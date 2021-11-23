const debug = require("debug")("dreamist:errors");
const chalk = require("chalk");
const { ValidationError } = require("express-validation");

export const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (error, req, res, next) => {
  debug(chalk.red("An error has occurred: ", error.message));
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "Bad romance";
  }
  const message = error.code ? error.message : "Idk what to tell you man";
  res.status(error.code || 500).json({ error: message });
};
