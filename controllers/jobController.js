import Job from "../models/jobModel.js";


export const createJob = async (req, res) => {
  try {
    const { title, location, type, salary, description, requirements } = req.body;

    if (!title || !location || !type || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields are mandatory" });
    }

    const newJob = await Job.create({
      title,
      location,
      type,
      salary,
      description,
      requirements,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

    if (!job)
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });

    res.json({ success: true, message: "Job updated successfully", job });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job)
      return res
        .status(404)
        .json({ success: false, message: "Job not found" });

    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
