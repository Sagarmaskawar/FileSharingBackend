import express from "express";
import {
  downloadImage,
  getUser,
  getUserFiles,
  loginUser,
  registerUser,
  uploadImage,
} from "../Controller/imageCotroller.js";
import upload from "../Util/Upload.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/file/:fileId", downloadImage);
// router.get("/user/:userName", downloadImage);
router.get("/getUser/:userName", getUser);
router.get("/getUser/files/:Id", getUserFiles);
router.post("/register", upload.single("file"), registerUser);
router.post("/login", upload.single("file"), loginUser);

export default router;
