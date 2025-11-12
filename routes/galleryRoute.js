import express from "express";
import {
  createGalleryItem,
  getGallery,
  updateGalleryItem,
  deleteGalleryItem,
} from "../controllers/galleryController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // multer middleware

const router = express.Router();

// Public

router.get("/all", getGallery);

// Admin protected

router.post("/create", protect, adminOnly, upload.single("image"), createGalleryItem);
router.put("/update/:id", protect, adminOnly, upload.single("image"), updateGalleryItem);
router.delete("/delete/:id", protect, adminOnly, deleteGalleryItem);

export default router;
