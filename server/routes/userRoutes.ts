import express from "express";
import { userLogin, userSignUp } from "../controllers/userControllers";

const router = express.Router();

router.post("/login", userLogin);

router.post("/register", userSignUp);

export default router;
