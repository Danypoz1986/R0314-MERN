const mongoose = require('mongoose');

// Define the structure of documents in the 'projects' collection

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    status: {type: String, default: 'ongoing'},
});

module.exports = mongoose.model('Project', projectSchema);
