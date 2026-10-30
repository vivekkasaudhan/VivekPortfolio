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

  // 1. Save message to MongoDB Atlas
  let dbSaved = false;
  try {
    if (mongoose.connection.readyState === 1) {
      await ContactMessage.create(payload);
      dbSaved = true;
      console.log("Contact message saved to MongoDB Atlas:", payload);
    } else {
      console.warn("MongoDB not connected yet. Proceeding with email dispatch.");
    }
  } catch (dbError) {
    console.error("Database save warning:", dbError.message);
  }

  // 2. Dispatch Email Notification via HTTPS (Never blocked by Render)
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.warn("WEB3FORMS_ACCESS_KEY is not set in environment.");
    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out! Your message has been recorded."
    });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: name,
        email: email,
        subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
        from_name: "Portfolio Contact Form",
        message: `New message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        replyto: email
      })
    });

    const result = await response.json();

    if (result.success) {
      console.log("Email successfully dispatched via Web3Forms HTTPS API");
      return res.status(201).json({
        success: true,
        message: "Thanks for reaching out! Your message has been sent successfully."
      });
    } else {
      console.error("Web3Forms API response error:", result);
      return res.status(500).json({
        success: false,
        message: result.message || "Failed to dispatch email notification."
      });
    }
  } catch (apiError) {
    console.error("Email dispatch error:", apiError.message);
    return res.status(500).json({
      success: false,
      message: `Failed to send email: ${apiError.message}`
    });
  }
};
