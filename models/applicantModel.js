import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    coverLetter: { type: String, required: true },
    jobTitle: { type: String },
    resumeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Applicant", applicantSchema);
