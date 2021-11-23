/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();
import initializeServer from "./server/index";
import initializeDB from "./database";

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
