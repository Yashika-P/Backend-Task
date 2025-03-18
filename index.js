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
app.use(express.json());
app.use(cors());

// 🔥 REMOVE "X-Powered-By" HEADER FOR SECURITY 🔥
app.disable("x-powered-by");

// ✅ Proper CORS Configuration
const allowedOrigins = [
  "http://localhost:3000", // For development
  "https://yashi-event-frontend.netlify.app" // For production
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
  credentials: true
}));

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);  
app.use("/api/events", eventRoutes);// ✅ Ensure this path is correct
app.use('/api/attendees', require('./routes/attendeeRoutes'));
app.use("/api/users", require("./routes/userRoutes"));
app.use('/api/tickets', ticketRoutes);
app.post("/api/login", async (req, res) => {
  res.json({ message: "Login successful" });
});

console.log("Event routes are loaded");


// Handle 404 Errors
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
