import express from "express";
import pool from "./database.js";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        error: "Please verify your email before logging in",
        needsVerification: true,
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      token: token,
      user: {
        id: user.id,
        email: user.email,
        first: user.first_name,
        last: user.last_name,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
