import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { ContactMessage } from "../models/ContactMessage.js";

const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (
    !emailUser ||
    !emailPass ||
    emailPass === "your_16_character_app_password" ||
    emailPass.trim() === ""
  ) {
    return null;
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass.replace(/\s+/g, "") // Automatically strip spaces from Google 16-character app passwords
    }
  });
};

export const createContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email, subject, and message."
    });
  }

  const payload = { name, email, subject, message };

  // 1. Save to MongoDB if connected
  try {
    if (mongoose.connection.readyState === 1) {
      await ContactMessage.create(payload);
    } else {
      console.warn("Contact message received without database connection:", payload);
    }
  } catch (dbError) {
    console.error("Database save warning:", dbError.message);
  }

  // 2. Send Email Notification via Nodemailer
  try {
    const transporter = getTransporter();

    if (transporter) {
      const recipient = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: recipient,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
        text: `New contact message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
            <div style="padding-bottom: 16px; border-bottom: 2px solid #3b82f6;">
              <h2 style="margin: 0; color: #0f172a; font-size: 20px;">📬 New Message from Portfolio</h2>
              <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Received via portfolio contact form</p>
            </div>

            <div style="margin-top: 18px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: underline;">${email}</a></p>
              <p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>
            </div>

            <div style="margin-top: 18px; padding: 18px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 6px;">
              <h4 style="margin: 0 0 8px; color: #166534; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
              <p style="margin: 0; color: #14532d; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px;">
                Reply Directly to ${name}
              </a>
              <p style="margin-top: 12px; font-size: 12px; color: #94a3b8;">
                You can also just click "Reply" in your email app.
              </p>
            </div>
          </div>
        `
      });

      console.log(`Email successfully dispatched to ${recipient}`);
    } else {
      console.warn("Nodemailer not configured or using placeholder credentials. Please update EMAIL_PASS in server/.env");
    }

    return res.status(201).json({
      success: true,
      message: "Thanks for reaching out! Your message has been sent successfully."
    });
  } catch (mailError) {
    console.error("Nodemailer error details:", mailError);
    return res.status(500).json({
      success: false,
      message: `Failed to send email: ${mailError.message || "Please check server email credentials."}`
    });
  }
};