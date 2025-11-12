import Service from "../models/servicesModel.js";
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


export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Title & Description are required" });
    }

    let iconUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "services");
      iconUrl = result.secure_url;
    }

    const service = await Service.create({
      title,
      description,
      icon: iconUrl,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    let updatedData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "services");
      updatedData.icon = result.secure_url;
    }

    const service = await Service.findByIdAndUpdate(id, updatedData, { new: true });

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update Service Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
