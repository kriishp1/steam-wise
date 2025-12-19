import express from "express";
import pool from "./database.js";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// make transporter for emails, this is the one that sends the emails
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "apikey", // This is literal 'apikey', not a placeholder
    pass: process.env.API_KEY_SENDGRID, // Your SendGrid API key
  },
});

app.use(cors());
app.use(express.json());
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email Required" });
    }

    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        message: "If that email exists, we sent a reset link",
      });
    }

    const user = result.rows[0];
    const userEmail = user.email;

    const resetToken = jwt.sign(
      {
        userId: user.id,
        email: userEmail,
        purpose: "password-reset",
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    await pool.query(
      `UPDATE users SET reset_password_token = $1,
            reset_token_expires_at = NOW() + INTERVAL '30 minutes' WHERE id = $2`,
      [resetToken, user.id]
    );

    const passwordResetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Reset Password",
      html: `
                <h1>Hello ${userEmail}!</h1>
                <p>Reset your password by clicking the link below:</p>
                <a href="${passwordResetUrl}">Reset Password</a>
                <p>This link expires in 30 minutes.</p>
            `,
    });

    res.json({
      success: true,
      message: "Check your email to reset password, Check Spam folder",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be atleast 6 characters" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.purpose != "password-reset") {
      return res.status(400).json({ error: "Invalid token type" });
    }

    const result = await pool.query(
      `SELECT * FROM users WHERE reset_password_token = $1 AND reset_token_expires_at > NOW()`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        message: "If that email exists, we sent a reset link",
      });
    }

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid or expired link" });
    }

    const user = result.rows[0];

    // hash the new password
    const hash = await bcrypt.hash(newPassword, 12);

    // update the database
    await pool.query(
      `UPDATE users SET password = $1, reset_password_token = NULL, reset_token_expires_at = NULL 
            WHERE id = $2 `,
      [hash, user.id]
    );

    res.json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});
