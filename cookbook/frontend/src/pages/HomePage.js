import React, { useEffect, useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import { getRecipes, addRecipe, updateRecipe } from '../services/api';
import "../styles.css";
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]); // List of recipes
  const [editingRecipe, setEditingRecipe] = useState(null); // Recipe being edited
  const [alertMessage, setAlertMessage] = useState(''); // Message for user alerts
  const [alertType, setAlertType] = useState(''); // 'success' or 'danger'
  const [showAlert, setShowAlert] = useState(false); // Display alert
  const [isEditingMode, setIsEditingMode] = useState(false); // Editing mode flag

  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = Boolean(location.state?.recipe); // Check if a recipe is being edited

  useEffect(() => {
    document.title = "Cookbook - Home"; // Set page title
  }, []);

  // Handle recipe editing state
  useEffect(() => {
    if (isEditing) {
      setEditingRecipe(location.state.recipe);
      setIsEditingMode(true);
    } else {
      setEditingRecipe(null);
      setIsEditingMode(false);
    }
  }, [isEditing, location.state]);

  const handleNavigation = (path) => {
    if (isEditingMode) {
      // Confirm before navigating away with unsaved changes
      if (window.confirm("You have unsaved changes. Are you sure you want to leave?")) {
        setIsEditingMode(false); // Reset unsaved changes flag
        navigate(path); // Navigate to the new path
      }
    } else {
      navigate(path); // Navigate directly
    }
  };

  const fetchRecipes = async () => {
    const data = await getRecipes();
    setRecipes(data); // Load recipes from the backend
  };

  const handleAddRecipe = async (newRecipe) => {
    setIsEditingMode(false);
    try {
      await addRecipe(newRecipe); // Add recipe via API
      fetchRecipes(); // Refresh recipe list
      triggerAlert('Recipe added successfully!', 'success');
    } catch (error) {
      triggerAlert('Failed to add recipe. Please try again.', 'danger');
    }
  };

  const handleEditRecipe = async (updatedRecipe) => {
    try {
      await updateRecipe(editingRecipe._id, updatedRecipe); // Update recipe via API
      setEditingRecipe(null); // Clear editing state
      fetchRecipes(); // Refresh recipe list
      triggerAlert('Recipe updated successfully!', 'success');
    } catch (error) {
      triggerAlert('Failed to update recipe. Please try again.', 'danger');
    }
  };

  const triggerAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true); // Display alert
    // Hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <header className="text-white py-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h1>Cookbook</h1>
            </div>
          </div>
          <div className="row align-items-center justify-content-center mt-3">
            <nav>
              <button onClick={() => handleNavigation("/")}>Home</button>
              <button onClick={() => handleNavigation("/recipes")}>Recipes</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Alert Message */}
      {showAlert && (
        <div
          className={`alert alert-${alertType} text-center`}
          style={{
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
            top: 0,
          }}
        >
          {alertMessage}
        </div>
      )}

      <div className="container mt-4" id="body">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <RecipeForm
              onSubmit={editingRecipe ? handleEditRecipe : handleAddRecipe} // Decide whether to add or edit
              initialData={editingRecipe} // Prefill form if editing
              onReset={() => {
                setEditingRecipe(null);
                setIsEditingMode(false); // Reset editing mode
              }}
              onChange={() => setIsEditingMode(true)} // Mark form as dirty
            />
          </div>
        </div>
      </div>

      <footer className="text-white py-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <p>Cookbook App © 2024 | Created by Daniel</p>
              <p>
                <a
                  href="https://github.com/Danypoz1986"
                  className="text-white text-decoration-none"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;
