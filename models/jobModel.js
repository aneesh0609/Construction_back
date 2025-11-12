import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, // Full-time / Part-time / Contract
    salary: { type: String },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
