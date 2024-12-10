import React, { useEffect, useState } from 'react';
import { getRecipes, deleteRecipe } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cookbook - Recipes page"; // Set the title here
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchQuery, selectedCategory, recipes]);

  // Fetch recipes from the backend
  const fetchRecipes = async () => {
    try {
      const data = await getRecipes();
      console.log('Fetched recipes:', data);
      setRecipes(data);
      setFilteredRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      console.log(`Attempting to delete recipe with id: ${id}`);
      await deleteRecipe(id); // Call the delete API
      console.log(`Successfully deleted recipe with id: ${id}`);
      // Remove the deleted recipe from local state
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
      console.log('Recipe list successfully updated.');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleEditRecipe = (recipe) => {
    navigate('/', { state: { recipe } });
  };

  // Filter recipes based on search query and category
  const filterRecipes = () => {
    let filtered = recipes;
  
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
  
      filtered = filtered.filter((recipe) => {
        // Ensure fields are strings or arrays before matching
        const title = recipe.title?.toLowerCase() || '';
        const category = recipe.category?.toLowerCase() || '';
        const ingredients = Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join(' ').toLowerCase()
          : recipe.ingredients?.toLowerCase() || '';
  
        // Check for matches in title, category, or ingredients
        return (
          title.includes(lowerCaseQuery) ||
          category.includes(lowerCaseQuery) ||
          ingredients.includes(lowerCaseQuery)
        );
      });
    }
  
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (recipe) => recipe.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  
    setFilteredRecipes(filtered);
  };
  

  return (
    <>
      <header className="text-white py-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h1>Cookbook<br/>Recipes Page</h1>
            </div>
          </div>
          <div className="row align-items-center justify-content-center mt-3">
            <nav>
              <a href="/">
                Home
              </a>
              <a href="#">
                Recipes
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mt-4">
      <div className="search-container">
  <input
    type="text"
    className="search-bar"
    placeholder="Search recipes by title, category, or ingredients"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
  <select
    className="category-filter"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Breakfast">Breakfast</option>
    <option value="First Course">First Course</option>
    <option value="Second Course">Second Course</option>
    <option value="Dessert">Dessert</option>
  </select>
</div>

        {/* Recipes Grid */}
        <div className="row">
          {filteredRecipes.length === 0 ? (
            <p className="text-center">No recipes found. Try adjusting your search or filters.</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe._id}>
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onEdit={() => handleEditRecipe(recipe)}
                onDelete={() => handleDeleteRecipe(recipe._id)}
              />
            </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RecipesPage;
