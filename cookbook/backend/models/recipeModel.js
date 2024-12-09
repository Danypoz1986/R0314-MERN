const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: String, required: true },
  category: { type: String, required: true },
  prepTime: { type: Number },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Recipe', recipeSchema);
