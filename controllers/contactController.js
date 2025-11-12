import Contact from "../models/contactModel.js";


export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const inquiry = await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({ success: true, message: "Inquiry submitted successfully", inquiry });
  } catch (error) {
    console.error("Inquiry Submit Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};





export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, inquiries });
  } catch (error) {
    console.error("Get Inquiries Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};





export const updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = ["Pending", "Seen", "Replied"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const inquiry = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });

    res.status(200).json({ success: true, message: "Status updated", inquiry });
  } catch (error) {
    console.error("Update Inquiry Status Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Contact.findByIdAndDelete(req.params.id);

    if (!inquiry) return res.status(404).json({ success: false, message: "Inquiry not found" });

    res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Delete Inquiry Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
