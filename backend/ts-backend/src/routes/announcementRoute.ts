// import { Router } from "express";
// import {
//   createAnnouncement,
//   getAnnouncements,
// //   getAnnouncementById,
//   updateAnnouncement,
//   deleteAnnouncement,
// } from "../controllers/announcementController";

// const router = Router();

// router.post("/add", createAnnouncement);        // Create new
// router.get("/list", getAnnouncements);           // Get all
// // router.get("/:id", getAnnouncementById);     // Get single
// router.put("/update/:_id", updateAnnouncement);      // Update
// router.delete("/delete/:_id", deleteAnnouncement);   // Delete

// export default router;



import { Router } from "express";
import multer from "multer";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcementController";

// Configure multer to handle form data without file uploads
const upload = multer(); // This creates multer instance for parsing form data only

const router = Router();

// Use multer middleware to parse multipart form data
router.post("/add", upload.none(), createAnnouncement);        // .none() means no file uploads expected
router.get("/list", getAnnouncements);           
router.put("/update/:_id", upload.none(), updateAnnouncement);      
router.delete("/delete/:_id", deleteAnnouncement);   

export default router;
