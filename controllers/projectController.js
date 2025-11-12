import Project from "../models/projectModel.js";
import slugify from "slugify";
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


export const createProject = async (req, res) => {
  try {
    const { title, description, category, location, completionDate, featured } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return res.status(400).json({ success: false, message: "Project with this title already exists" });
    }

 
    let images = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "projects");
        images.push(result.secure_url);
      }
    }

    const newProject = await Project.create({
      title,
      slug,
      description,
      category,
      location,
      completionDate,
      images,
      featured,
    });

    res.status(201).json({ success: true, message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error("Get Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    if (req.body.title) {
      updatedData.slug = slugify(req.body.title, { lower: true, strict: true });
    }


    if (req.files && req.files.length > 0) {
      const images = [];
      for (const file of req.files) {
        const result = await uploadToCloudinary(file.buffer, "projects");
        images.push(result.secure_url);
      }
      updatedData.images = images;
    }

    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      updatedData,
      { new: true }
    );

    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    res
      .status(200)
      .json({ success: true, message: "Project updated successfully", project });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ slug: req.params.slug });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
