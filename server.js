import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js'
import projectRoutes from "./routes/projectRoute.js";
import contactRoutes from "./routes/contactRoutes.js";
import servicesRoutes from "./routes/servicesRoute.js";
import galleryRoutes from "./routes/galleryRoute.js";
import featuresRoutes from "./routes/featuresRoute.js";
import careerRoutes from "./routes/careerRoute.js";
import jobRoutes from "./routes/jobRoute.js";


dotenv.config();
const app = express();


connectDB();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,   // production frontend
      process.env.DASHBOARD_URL
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

app.use(morgan("dev"));



const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

app.use('/api/auth', authRoutes) ;
app.use("/api/projects", projectRoutes);
app.use('/api/contact', contactRoutes) ;
app.use("/api/services", servicesRoutes );
app.use("/api/gallery", galleryRoutes );
app.use("/api/features", featuresRoutes );
app.use("/api/careers", careerRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Construction Website Backend Running ✅");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
