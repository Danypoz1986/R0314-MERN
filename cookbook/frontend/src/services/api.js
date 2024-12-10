const API_URL = process.env.REACT_APP_API_URL;

// Fetch all recipes
export const getRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

// Add a new recipe
export const addRecipe = async (recipe) => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    throw new Error('Failed to add recipe');
  }
};

// Update an existing recipe
export const updateRecipe = async (id, updatedRecipe) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRecipe),
  });
  if (!response.ok) {
    throw new Error('Failed to update recipe');
  }
};

export const replaceRecipe = async (id, newRecipe) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRecipe),
  });
  if (!response.ok) {
    throw new Error('Failed to replace recipe');
  }
  return response.json(); // Return the updated recipe if the backend responds with it
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }
};
