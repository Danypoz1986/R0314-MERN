const Recipe = require('../models/recipeModel'); // Import Recipe model for MongoDB operations

// Handler to fetch all recipes from the database
exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes
    res.status(200).json(recipes); // Respond with the recipes in JSON format
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle and respond with any errors
  }
};

// Handler to add a new recipe to the database
exports.addRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body); // Create a new Recipe instance with request body data
    await newRecipe.save(); // Save the recipe to the database
    res.status(201).json(newRecipe); // Respond with the newly created recipe
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle and respond with any errors
  }
};

// Handler to update an existing recipe in the database
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id, // Recipe ID from request parameters
      req.body, // Updated data from request body
      { new: true } // Return the updated document
    );
    res.status(200).json(updatedRecipe); // Respond with the updated recipe
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle and respond with any errors
  }
};

// Handler to delete a recipe from the database
exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id); // Delete the recipe with the given ID
    res.status(200).json({ message: 'Recipe deleted successfully' }); // Respond with a success message
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle and respond with any errors
  }
};

