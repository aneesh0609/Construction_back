import Applicant from "../models/applicantModel.js";
import cloudinary from "../config/cloudinary.js";


const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "raw" }, // "raw" for PDFs/DOCs
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });


export const applyJob = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      location,
      experience,
      coverLetter,
      jobTitle,
    } = req.body;


    if (
      !fullName ||
      !email ||
      !phone ||
      !location ||
      !experience ||
      !coverLetter
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }


    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Resume file is required" });
    }

    
    if (req.file.size > 500 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume file size must not exceed 500 KB",
      });
    }

 
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only PDF, DOC, and DOCX files are allowed",
      });
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer, "resumes");

   
    const newApplicant = await Applicant.create({
      fullName,
      email,
      phone,
      location,
      experience,
      coverLetter,
      jobTitle,
      resumeUrl: uploadResult.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      applicant: newApplicant,
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



export const getApplications = async (req, res) => {
  const applicants = await Applicant.find().sort({ createdAt: -1 });
  res.json({ success: true, applicants });
};



export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);

    if (!applicant) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }


    if (applicant.resumeUrl) {
      const parts = applicant.resumeUrl.split("/");
      const fileName = parts[parts.length - 1]; 
      const publicId = `resumes/${fileName.split(".")[0]}`;

      try {
        await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
      } catch (err) {
        console.warn("⚠️ Cloudinary file deletion failed:", err.message);
      }
    }

    await Applicant.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};