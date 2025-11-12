import Gallery from "../models/galleryModel.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });


export const createGalleryItem = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }


    const result = await uploadToCloudinary(req.file.buffer, "gallery");

    const item = await Gallery.create({
      title,
      description,
      imageUrl: result.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Gallery item added successfully",
      item,
    });
  } catch (error) {
    console.error("Create Gallery Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getGallery = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    console.error("Fetch Gallery Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    let updatedData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "gallery");
      updatedData.imageUrl = result.secure_url;
    }

    const item = await Gallery.findByIdAndUpdate(id, updatedData, { new: true });

    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      item,
    });
  } catch (error) {
    console.error("Update Gallery Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Gallery.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Gallery Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
