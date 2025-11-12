import express from "express";
import multer from "multer";
import { applyJob, deleteApplication, getApplications } from "../controllers/careerController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/all",protect,adminOnly, getApplications);
router.post("/apply", upload.single("resume"), applyJob);
router.delete("/:id",protect,adminOnly, deleteApplication);

export default router;
