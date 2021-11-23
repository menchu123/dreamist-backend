import express from "express";

import cors from "cors";
import morgan from "morgan";
import Debug from "debug";
import chalk from "chalk";

import userRoutes from "./routes/userRoutes";
import { notFoundErrorHandler, errorHandler } from "./middlewares/errors";

const debug = Debug("dreamist:server");
const app = express();
app.use(cors());

const initializeServer = (port) =>
  new Promise((resolve) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`connecting to ${port}`));
      resolve(server);
    });

    server.on("error", (error: any) => {
      debug(chalk.red("Error initializing Server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
      }

      debug(chalk.red(error.code));
    });

    server.on("close", () => {
      debug(chalk.blue("See you soon"));
    });
  });

app.use(morgan("dev"));
app.use(express.json());

app.use("/users", userRoutes);
app.use(notFoundErrorHandler);
app.use(errorHandler);

export default initializeServer;
