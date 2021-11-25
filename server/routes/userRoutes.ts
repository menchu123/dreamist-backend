import express from "express";
import { validate } from "express-validation";
import { userLogin, userSignUp } from "../controllers/userControllers";
import loginSchema from "../schemas/userSchemas";

const router = express.Router();

router.post("/login", validate(loginSchema), userLogin);

router.post("/register", userSignUp);

export default router;
