import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onSubmit, initialData, onChange }) => {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    category: '',
    prepTime: '',
  });

  // Handle form reset or populate with initialData
  useEffect(() => {
    setRecipe(initialData || { title: '', ingredients: '', steps: '', category: '', prepTime: '' });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });

    // Notify the parent of any change
    onChange && onChange();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(recipe);
    setRecipe({ title: '', ingredients: '', steps: '', category: '', prepTime: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          className="form-control"
          placeholder="Enter recipe title"
          value={recipe.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={recipe.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="First Course">First Course</option>
          <option value="Second Course">Second course</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="prepTime" className="form-label">Prep Time (mins)</label>
        <input
          type="number"
          id="prepTime"
          name="prepTime"
          className="form-control"
          placeholder="Enter prep time"
          value={recipe.prepTime}
          onChange={handleChange}
          min="0"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="ingredients" className="form-label">Ingredients (4 people)</label>
        <textarea
          id="ingredients"
          name="ingredients"
          className="form-control"
          rows="3"
          placeholder="List ingredients here"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="steps" className="form-label">Steps</label>
        <textarea
          id="steps"
          name="steps"
          className="form-control"
          rows="3"
          placeholder="Describe steps here"
          value={recipe.steps}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Save Recipe</button>
    </form>
  );
};

export default RecipeForm;

