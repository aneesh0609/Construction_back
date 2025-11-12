import express from "express";
import { 
  createService, 
  getAllServices, 
  updateService, 
  deleteService 
} from "../controllers/servicesControler.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // multer middleware

const router = express.Router();

// Admin routes

router.post("/create", protect, adminOnly,upload.single("icon"), createService);
router.put("/update/:id", protect, adminOnly,upload.single("icon"), updateService);
router.delete("/delete/:id", protect, adminOnly, deleteService);

// Public route

router.get("/all", getAllServices);

export default router;
