import express from "express";
import {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // memory storage

const router = express.Router();

// Public routes
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Admin routes
router.post("/create", protect, adminOnly, upload.array("images", 5), createProject);
router.put("/:slug", protect, adminOnly, upload.array("images", 5), updateProject);
router.delete("/:slug", protect, adminOnly, deleteProject);

export default router;
