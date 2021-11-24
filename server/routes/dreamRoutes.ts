import express from "express";
import { getUserDreams } from "../controllers/dreamControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/userDreams", auth, getUserDreams);

export default router;
