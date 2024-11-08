const express = require('express'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/projectModel')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then (() => console.log('MongoDB connected'))
.catch ((error) => console.error('MongoDB connection error:', error));

// Define API Routes
app.get('/api/getall', async (req, res) => {
try {
    const projects = await Project.find();
    res.status(200).json(projects);
} catch (error) {
    res.status(500).json({message: error.message});
}
});

app.get('/api/:id', async (req, res) => {
    try{
        const project = await Project.findById(req.params.id);
        if (!project){
            return res.status(404).json({ message: 'Project not found' })
        }
        res.status(200).json(project)
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/add', async (req, res) => {
    const project = new Project(req.body);
    try{
        const newProject = await project.save();
        res.status(201).json(newProject);
    }catch (error){
        res.status(400).json({message: error.message});
    }
});

app.patch('/api/update/:id', async (req, res) => {
    try{
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if(!updatedProject) {
        return res.status(404).json({message: 'Project not found'});
    }
    res.status(200).json(updatedProject);
} catch (error){
    res.status(400).json({message: error.message});
}
});

app.delete('/api/delete/:id', async (req, res) => {
try{
        const project = await Project.findByIdAndDelete(req.params.id);
    if(! project) {
        return res.status(404).json({message: 'Project not found'});
    }
    res.status(200).json({message: 'Project deleted'});
} catch (error) {
    res.status(500).json({message: error.message});
}
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



