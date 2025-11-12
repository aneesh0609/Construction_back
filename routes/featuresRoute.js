import express from "express";
import {
  createFeature,
  getFeatures,
  updateFeature,
  deleteFeature,
} from "../controllers/featuresController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";


const router = express.Router();

// Public route
router.get("/all", getFeatures);

// Admin routes
router.post("/create", protect, adminOnly, createFeature);
router.put("/update/:id", protect, adminOnly, updateFeature);
router.delete("/delete/:id", protect, adminOnly, deleteFeature);

export default router;
