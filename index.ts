require("dotenv").config();
const { initializeServer } = require("./server/index");
const { initializeDB } = require("./database");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 5050;

(async () => {
  try {
    await initializeDB(
      "mongodb+srv://admin:juanymedio11@cluster0.lqq22.mongodb.net/dreamist"
    );
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
