const express = require('express');
const { getRecipes, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.get('/', getRecipes);
router.post('/', addRecipe);
router.patch('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

module.exports = router;
