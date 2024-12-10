const API_URL = process.env.REACT_APP_API_URL;

// Fetch all recipes
export const getRecipes = async () => {
  // Sends a GET request to fetch all recipes
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    // Throws an error if the request fails
    throw new Error('Failed to fetch recipes');
  }
  return response.json(); // Parses and returns the JSON response
};

// Add a new recipe
export const addRecipe = async (recipe) => {
  // Sends a POST request to add a new recipe
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST', // HTTP method
    headers: { 'Content-Type': 'application/json' }, // Sets content type to JSON
    body: JSON.stringify(recipe), // Converts the recipe object to a JSON string
  });
  if (!response.ok) {
    // Throws an error if the request fails
    throw new Error('Failed to add recipe');
  }
};

// Update an existing recipe
export const updateRecipe = async (id, updatedRecipe) => {
  // Sends a PATCH request to update an existing recipe
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PATCH', // HTTP method for partial update
    headers: { 'Content-Type': 'application/json' }, // Sets content type to JSON
    body: JSON.stringify(updatedRecipe), // Converts the updated recipe object to a JSON string
  });
  if (!response.ok) {
    // Throws an error if the request fails
    throw new Error('Failed to update recipe');
  }
};

export const replaceRecipe = async (id, newRecipe) => {
  // Sends a PUT request to completely replace a recipe
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT', // HTTP method for complete replacement
    headers: { 'Content-Type': 'application/json' }, // Sets content type to JSON
    body: JSON.stringify(newRecipe), // Converts the new recipe object to a JSON string
  });
  if (!response.ok) {
    // Throws an error if the request fails
    throw new Error('Failed to replace recipe');
  }
  return response.json(); // Parses and returns the updated recipe if provided in the response
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  // Sends a DELETE request to remove a recipe
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE', // HTTP method
  });
  if (!response.ok) {
    // Throws an error if the request fails
    throw new Error('Failed to delete recipe');
  }
};
