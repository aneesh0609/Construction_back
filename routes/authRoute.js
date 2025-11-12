import express from "express";
import { signup, signin, logout, me } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, me);

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/logout", protect, logout);


export default router;
