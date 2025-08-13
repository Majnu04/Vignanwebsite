import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  createEvent,
  getAllEvents,
  deleteEvent,
  updateEvent,
} from '../controllers/newsEventsController';


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

router.post('/add', upload.single('image'), createEvent);
router.get('/list', getAllEvents);
router.put('/update/:_id',upload.single('image'), updateEvent);
router.delete('/delete/:_id', deleteEvent);

export default router;
