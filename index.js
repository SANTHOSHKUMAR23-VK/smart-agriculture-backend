const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // Import path module
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes"); // ✅ Import userRoutes
const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes"); // Import productRoutes
const schemeRoutes = require('./routes/schemeRoutes'); // Import schemeRoutes
const weatherRoutes = require('./routes/weatherRoutes'); // Import weatherRoutes
const diseaseRoutes = require('./routes/diseaseRoutes'); // Import diseaseRoutes
const chatbotRoutes = require('./routes/chatbotRoutes'); // Import chatbotRoutes

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON body
app.use(express.urlencoded({ extended: true })); // ✅ Parse Form-Data

// Use Routes
app.use("/api/users", userRoutes); // ✅ Ensure this line is present
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes); // Add this line below the user routes
app.use('/api/schemes', schemeRoutes); // Add this line below the product routes
app.use('/api/weather', weatherRoutes); // Add this line below the scheme routes
app.use('/api/disease', diseaseRoutes); // Add this line below the weather routes
app.use('/api/chatbot', chatbotRoutes); // Add this line below the disease routes

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Simple Route
app.get("/", (req, res) => {
  res.send("Welcome to Smart Agriculture API!");
});

// Define Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
