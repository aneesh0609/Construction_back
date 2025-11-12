import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Residential", "Commercial", "Industrial", "Renovation", "Road Construction", "Other"],
    },

    location: {
      type: String,
      required: true,
    },

    completionDate: {
      type: Date,
    },

    images: {
      type: [String], 
      default: [],
    },

    featured: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
