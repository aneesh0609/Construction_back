import express from "express";
import {
  submitInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/contactController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - Submit contact form

router.post("/submit", submitInquiry);

//  Admin - Get all inquiries

router.get("/", adminOnly, getInquiries);

//  Admin - Update inquiry status (Pending/Seen/Replied)

router.put("/:id", protect, adminOnly, updateInquiryStatus);

// Admin - Delete inquiry

router.delete("/:id", protect, adminOnly, deleteInquiry);

export default router;
