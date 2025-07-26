import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yatishgottapu2026@gmail.com", // your Gmail address
      pass: "yatish@2026", // use an App Password, not your Gmail password
    },
  });

  // Email options
  const mailOptions = {
    from: "yatishgottapu2026@gmail.com",
    to: email,
    subject: "Welcome to GearUp Newsletter!",
    text: "Thank you for subscribing to GearUp. Stay tuned for updates!",
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;