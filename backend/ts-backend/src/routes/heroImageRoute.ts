import express from "express";
import multer from 'multer';
import path from 'path';
// import upload from "../middlewares/upload";
import {
  createHeroImage,
  getHeroImages,
  deleteHeroImage,
  updateHeroImage,
} from "../controllers/heroImageController";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)+ file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});

const upload = multer({ storage : storage });

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "desktopImage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  createHeroImage
);

router.get("/list", getHeroImages);
router.delete("/delete/:_id", deleteHeroImage);
router.put("/update/:_id",upload.fields([
    { name: "desktopImage", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),updateHeroImage);

export default router;
