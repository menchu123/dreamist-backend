import express from "express";
import {
  getUserDreams,
  getUserDreamById,
  createDream,
} from "../controllers/dreamControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/user-dreams", auth, getUserDreams);
router.get("/user-dreams/:idDream", auth, getUserDreamById);
router.post("/user-dreams/new", auth, createDream);

export default router;
