require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5050;

module.exports = port;
