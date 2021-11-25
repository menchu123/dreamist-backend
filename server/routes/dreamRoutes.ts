import express from "express";
import multer from "multer";
import path from "path";
import {
  getUserDreams,
  getUserDreamById,
  createDream,
} from "../controllers/dreamControllers";
import auth from "../middlewares/auth";
import firebase from "../middlewares/firebase";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);
      const oldFilenameWithoutExtension = oldFilename.replace(
        oldFilenameExtension,
        ""
      );

      const newFilename = `${oldFilenameWithoutExtension}-${Date.now()}-${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
});

router.get("/user-dreams", auth, getUserDreams);
router.get("/user-dreams/:idDream", auth, getUserDreamById);
router.post(
  "/user-dreams/new",
  auth,
  upload.single("image"),
  firebase,
  createDream
);

export default router;
