const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");
const User = require('../models/userModel'); 

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Check for missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

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


router.post('/login', loginUser);

module.exports = router;
