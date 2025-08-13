import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  createPlacement,
  getAllPlacements,
  updatePlacement,
  deletePlacement
} from '../controllers/placementController';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)+ file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Multiple file upload: image & companyLogo
router.post(
  '/add',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]),
  createPlacement
);

router.get('/list', getAllPlacements);

router.put(
  '/update/:_id',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]),
  updatePlacement
);

router.delete('/delete/:_id', deletePlacement);

export default router;
