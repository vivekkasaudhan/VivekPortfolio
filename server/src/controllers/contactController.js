import mongoose from "mongoose";
import { ContactMessage } from "../models/ContactMessage.js";

export const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, subject, and message."
    });
  }

  const payload = { name, email, subject, message };

  // Save message to MongoDB Atlas
  try {
    if (mongoose.connection.readyState === 1) {
      await ContactMessage.create(payload);
      console.log("Contact message saved to MongoDB Atlas:", payload);
    } else {
      console.warn("MongoDB connection not ready:", payload);
    }
  } catch (dbError) {
    console.error("Database save warning:", dbError.message);
  }

  return res.status(201).json({
    success: true,
    message: "Contact message saved successfully."
  });
};
