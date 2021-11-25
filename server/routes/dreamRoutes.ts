import express from "express";
import {
  getUserDreams,
  getUserDreamById,
  createDream,
  deleteDream,
} from "../controllers/dreamControllers";
import auth from "../middlewares/auth";
import firebase from "../middlewares/firebase";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/user-dreams", auth, getUserDreams);
router.get("/user-dreams/:idDream", auth, getUserDreamById);
router.post(
  "/user-dreams/new",
  auth,
  upload.single("image"),
  firebase,
  createDream
);
router.delete("/user-dreams/delete/:idDream", auth, deleteDream);

export default router;
