// import express from 'express';
// import upload from '../middleware/upload';
// import { addDepartment, updateDepartment } from '../controllers/departmentController';

// const router = express.Router();

// router.post(
//   '/add',
//   upload.fields([
//     { name: 'heroImage', maxCount: 1 },
//     { name: 'hodImage', maxCount: 1 }
//   ]),
//   addDepartment
// );

// router.put(
//   '/edit/:id',
//   upload.fields([
//     { name: 'heroImage', maxCount: 1 },
//     { name: 'hodImage', maxCount: 1 }
//   ]),
//   updateDepartment
// );

// export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import { addDepartment, updateDepartmentByCode, getDepartmentByCode, getDepartment, deleteDepartment } from '../controllers/departmentController';

const router = express.Router();

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

router.get('/list/:code', getDepartmentByCode);
router.get('/list',getDepartment);

router.post(
  '/add',
  upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'hodImage', maxCount: 1 }
  ]),
  addDepartment
);

router.put('/update/:_id', upload.fields([
  { name: 'heroImage', maxCount: 1 },
  { name: 'hodImage', maxCount: 1 }
]), updateDepartmentByCode);

router.delete('/delete/:_id',deleteDepartment);


export default router;

