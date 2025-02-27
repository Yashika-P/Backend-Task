const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

// Sample Login API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy check (replace with real authentication)
  if (email === "test@example.com" && password === "123456") {
    res.json({ message: "Login successful", user: { email } });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


router.post("/login", loginUser);  // ✅ This should exist!

module.exports = router;
