import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);
