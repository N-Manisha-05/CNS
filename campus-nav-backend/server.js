// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config();
// const dotenv = require('dotenv');

// dotenv.config(); 
// // Initialize Express
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes (FIX: Ensure correct route import)
// const locationRoutes = require("./routes/locationRoutes"); // Check this line
// app.use("/api/locations", locationRoutes);

// app.get("/", (req, res) => {
//     res.send("Campus Navigation API is running...");
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const dotenv = require("dotenv");

dotenv.config(); 

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const locationRoutes = require("./routes/locationRoutes");
const authRoutes = require("./routes/authRoutes"); // Import auth routes

app.use("/api/locations", locationRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes

app.get("/", (req, res) => {
    res.send("Campus Navigation API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
