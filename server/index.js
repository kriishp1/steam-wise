import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import signupRouter from "./signup.js";
import loginRouter from "./login.js";
import forgotPasswordRouter from "./forgot_password.js";
import searchRouter from "./search.js";

// Use routes
app.use(signupRouter);
app.use(loginRouter);
app.use(forgotPasswordRouter);
app.use(searchRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
