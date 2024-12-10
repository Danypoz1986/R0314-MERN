const express = require('express'); // Import Express.js for creating the server
const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection and schema modeling
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const cors = require('cors'); // Import CORS for handling cross-origin requests
const recipeRoutes = require('./routes/recipeRoutes'); // Import recipe routes for API endpoints

dotenv.config(); // Load environment variables from .env file
const app = express(); // Initialize Express app
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies in requests

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // MongoDB connection string from environment variables
  .then(() => 
    app.listen(process.env.PORT || 5000, () => // Start server on specified port or default to 5000
      console.log(`Server running on port ${process.env.PORT || 5000}`) // Log success message
    )
  )
  .catch(err => console.log(err)); // Log error if connection fails

// Route all requests starting with /api/recipes to the recipe routes
app.use('/api/recipes', recipeRoutes); 
