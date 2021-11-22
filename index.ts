require("dotenv").config();
const { initializeServer } = require("./server/index");

require("dotenv").config();

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5050;

(async () => {
  try {
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
