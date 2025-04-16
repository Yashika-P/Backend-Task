const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");// ✅ Fix import
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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Check for a user with that email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Compare passwords directly (no bcrypt used)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ If successful, return user data
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});



// ✅ Register User Route
router.post("/register", registerUser);

// ✅ Login User Route
router.post("/login", loginUser);

module.exports = router;
