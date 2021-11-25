import express from "express";
import { validate } from "express-validation";
import {
  getUserDreams,
  getUserDreamById,
  createDream,
  deleteDream,
  updateDream,
} from "../controllers/dreamControllers";
import auth from "../middlewares/auth";
import firebase from "../middlewares/firebase";
import upload from "../middlewares/upload";
import createSchema from "../schemas/dreamSchemas";

const router = express.Router();

router.get("/user-dreams", auth, getUserDreams);
router.get("/user-dreams/:idDream", auth, getUserDreamById);
router.post(
  "/user-dreams/new",
  auth,
  upload.single("image"),
  firebase,
  validate(createSchema),
  createDream
);
router.delete("/user-dreams/delete/:idDream", auth, deleteDream);
router.put(
  "/user-dreams/edit/:idDream",
  auth,
  upload.single("image"),
  firebase,
  updateDream
);

export default router;
