import express from "express";
import pool from "./database.js";
import bcrypt from "bcrypt";
import cors from "cors";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// create a transporter that is sending the email
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  auth: {
    user: "apikey",
    pass: process.env.API_KEY_SENDGRID,
  },
});

app.use(cors());
app.use(express.json());

// go to signup page and make sure all fields are filled in
app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password is too short" });
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length > 0) {
      return res.status(400).json({ error: "Account already exists" });
    }

    // insert all values into the database if they meet the cases above
    const insert = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email`,

      [firstName, lastName, email, hash]
    );

    const userId = insert.rows[0].id;
    const userEmail = insert.rows[0].email;

    // create the verfication token that is then added to the database
    const verificationToken = jwt.sign(
      {
        userId: userId,
        email: userEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "6hr" }
    );

    // update the verification token, we previously created one so this just adds it to the database
    await pool.query(
      `UPDATE users SET verification_token = $1,
      token_expires_at = NOW() + INTERVAL '6 hours' WHERE ID = $2`,
      [verificationToken, userId]
    );

    // the url that they will confirm their email
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

    // process of sending the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h1>Welcome ${firstName}!</h1>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link expires in 6 hours.</p>
      `,
    });

    res.json({
      success: true,
      message: "Please check your email to verify your account",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// the GET request to see if the verification was successful
app.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send(`
        <h1>Error</h1>
        <p>Verification token is missing.</p>
      `);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await pool.query(
      `SELECT * FROM users WHERE verification_token = $1 AND token_expires_at > NOW()`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).send(`
        <h1>Verification Failed</h1>
        <p>This link is invalid or has expired.</p>
        <a href="http://localhost:5173/signup">Sign up again</a>
      `);
    }

    await pool.query(
      `UPDATE users SET is_verified = true, verification_token = NULL, token_expires_at = NULL
      WHERE id = $1`,
      [result.rows[0].id]
    );
    res.send(`
      <h1>Email Verified!</h1>
      <p>Your email has been successfully verified.</p>
      <p>You can now log in to your account.</p>
      <a href="http://localhost:5173/login">Go to Login</a>
    `);
  } catch (error) {
    console.error(error);
    res.status(400).send(`
      <h1>Verification Failed</h1>
      <p>Invalid or expired token.</p>
    `);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
