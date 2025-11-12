import Feature from "../models/featuresModel.js";



export const createFeature = async (req, res) => {
  try {
    const { title, description  } = req.body;

    if (!title || !description ) {
      return res.status(400).json({ success: false, message: "Title & Description are required" });
    }

    
    const feature = await Feature.create({
      title,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Feature created successfully",
      feature,
    });
  } catch (error) {
    console.error("Create Feature Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      features,
    });
  } catch (error) {
    console.error("Get Features Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const updateFeature = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = { ...req.body };


    const feature = await Feature.findByIdAndUpdate(id, updatedData, { new: true });

    if (!feature) {
      return res.status(404).json({ success: false, message: "Feature not found" });
    }

    res.status(200).json({
      success: true,
      message: "Feature updated successfully",
      feature,
    });
  } catch (error) {
    console.error("Update Feature Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteFeature = async (req, res) => {
  try {
    const { id } = req.params;

    const feature = await Feature.findByIdAndDelete(id);

    if (!feature) {
      return res.status(404).json({ success: false, message: "Feature not found" });
    }

    res.status(200).json({
      success: true,
      message: "Feature deleted successfully",
    });
  } catch (error) {
    console.error("Delete Feature Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
