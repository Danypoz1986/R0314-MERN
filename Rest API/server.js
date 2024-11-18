const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/projectModel') // Import the Project model

dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use the port from the environment variable or default to 3000

app.use(express.json()); // Middleware to parse incoming JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then (() => console.log('MongoDB connected')) // Log successful connection
.catch ((error) => console.error('MongoDB connection error:', error)); // Log connection errors

// Define API Routes

// Get all projects
app.get('/api/getall', async (req, res) => {
try {
    const projects = await Project.find(); // Fetch all projects from the database
    res.status(200).json(projects); // Return the projects as JSON
} catch (error) {
    res.status(500).json({message: error.message}); // Handle server errors
}
});

// Get a specific project by ID
app.get('/api/:id', async (req, res) => {
    try{
        const project = await Project.findById(req.params.id); // Find project by ID
        if (!project){
            return res.status(404).json({ message: 'Project not found' }) // Handle case where project is not found
        }
        res.status(200).json(project); // Return the project data as JSON
    }catch (error) {
        res.status(500).json({ message: error.message }); // Handle server errors
    }
});

// Add a new project
app.post('/api/add', async (req, res) => {
    const project = new Project(req.body); // Create a new project instance with the request body
    try{
        const newProject = await project.save(); // Save the project to the database
        res.status(201).json(newProject); // Return the saved project as JSON
    }catch (error){
        res.status(400).json({message: error.message}); // Handle validation or bad request errors
    }
});

// Add a new project using query parameters
app.post('/api/addProjectWithQuery', async (req, res) => {
    const {name, description, status} = req.query; // Extract query parameters
    if (!name || !description) {
        return res.status(400).json({message: "Name and description are required"}); // Validate required fields
    }
    const newProject = new Project ({
        name,
        description,
        status: status || 'ongoing' // Default status to 'ongoing' if not provided
    });

    try{
        const savedProject = await newProject.save(); // Save the project to the database
        res.status(201).json(savedProject); // Return the saved project as JSON
    }catch (error){
        res.status(400).json({message: error.message}); // Handle validation or bad request errors
    }
});

// Update an existing project
app.patch('/api/update/:id', async (req, res) => {
    try{
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation on the update
    });
    if(!updatedProject) {
        return res.status(404).json({message: 'Project not found'}); // Handle case where project is not found
    }
    res.status(200).json(updatedProject); // Return the updated project as JSON
} catch (error){
    res.status(400).json({message: error.message}); // Handle validation or bad request errors
}
});

// Delete a project
app.delete('/api/delete/:id', async (req, res) => {
try{
        const project = await Project.findByIdAndDelete(req.params.id); // Find and delete the project by ID
    if(!project) {
        return res.status(404).json({message: 'Project not found'}); // Handle case where project is not found
    }
    res.status(200).json({message: 'Project deleted'}); // Confirm deletion
} catch (error) {
    res.status(500).json({message: error.message}); // Handle server errors
}
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Log server start details
});
