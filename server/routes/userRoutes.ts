import express from "express";
import { userLogin } from "../controllers/userControllers";

const router = express.Router();

router.post("/login", userLogin);

export default router;
