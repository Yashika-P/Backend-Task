const User = require('../models/userModel');

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// LOGIN CONTROLLER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📥 Login attempt:");
    console.log("👉 Email:", email);
    console.log("👉 Password (entered):", password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("🟢 Found user:", user.email);
    console.log("🗝️ Stored password:", user.password);

    if (user.password !== password) {
      console.log("❌ Passwords do not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Login successful");
    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    console.error("❌ Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { registerUser, loginUser };
