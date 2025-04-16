const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const attendeeRoutes = require('./routes/attendeeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ Proper CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // ✅ For local development
  "https://yashi-event-frontend.netlify.app" // ✅ Your deployed frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // ✅ Allow cookies & authentication
}));

// ✅ Middlewares
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// 🔥 REMOVE "X-Powered-By" HEADER FOR SECURITY 🔥
app.disable("x-powered-by");

// ✅ Test Route (Keep This to Verify)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/attendees", attendeeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);
app.post("/api/login", async (req, res) => {
  res.json({ message: "Login successful" });
});


// ✅ Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
