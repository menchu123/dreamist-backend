const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("dreamist:server");
const chalk = require("chalk");

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
