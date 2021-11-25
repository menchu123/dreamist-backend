import admin from "firebase-admin";
import chalk from "chalk";
import Debug from "debug";

const debug = Debug("dreamist:firebase");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "dreamist-be502.appspot.com",
});

const firebase = async (req, res, next) => {
  try {
    const bucket = admin.storage().bucket();
    await bucket.upload(req.file.path);
    await bucket.file(req.file.filename).makePublic();
    const fileURL = bucket.file(req.file.filename).publicUrl();
    debug(chalk.green(fileURL));
    req.file.fileURL = fileURL;
    next();
  } catch (error) {
    error.code = 400;
    error.message = "Something failed while uploading to firebase";
  }
};

export default firebase;
