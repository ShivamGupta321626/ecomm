const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Sabse pehle env load karo
dotenv.config();

console.log("--- DEBUGGING SERVER ---");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI Loaded:", process.env.MONGO_URI ? "YES (Present)" : "NO (Undefined)");

const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Shivam Stationery Mart Backend is running successfully!"
  });
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});