import express from "express";
import { validate } from "express-validation";
import { userLogin, userSignUp } from "../controllers/userControllers";
import { loginSchema, registerSchema } from "../schemas/userSchemas";

const router = express.Router();

router.post("/login", validate(loginSchema), userLogin);

router.post("/register", validate(registerSchema), userSignUp);

export default router;
