import express from "express";
import {
  getUserDreams,
  getUserDreamById,
} from "../controllers/dreamControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/user-dreams", auth, getUserDreams);
router.get("/user-dreams/:idDream", auth, getUserDreamById);

export default router;
