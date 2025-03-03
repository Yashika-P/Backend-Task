const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://yashi-event-frontend.netlify.app", // ✅ Your Netlify frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // ✅ Allow cookies/auth if needed
  }));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", require("./routes/authRoutes"));  
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
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
