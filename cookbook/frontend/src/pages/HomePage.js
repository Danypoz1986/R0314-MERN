import React, { useEffect, useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import { getRecipes, addRecipe, updateRecipe } from '../services/api';
import "../styles.css";
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'danger'
  const [showAlert, setShowAlert] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false); // Flag for editing mode

  const location = useLocation();
  const navigate = useNavigate();
  const isEditing = Boolean(location.state?.recipe);

  // Set editingRecipe from navigation state or reset when the page loads
  useEffect(() => {
    if (isEditing) {
      setEditingRecipe(location.state.recipe);
      setIsEditingMode(true);
    } else {
      setEditingRecipe(null);
      setIsEditingMode(false);
    }
  }, [location.state]);
  

  const handleNavigation = (path) => {
    if (isEditingMode) {
      // Show confirmation before navigating away
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
    setRecipes(data);
  };

  const handleAddRecipe = async (newRecipe) => {
    setIsEditingMode(false);
    try {
      await addRecipe(newRecipe);
      fetchRecipes();
      triggerAlert('Recipe added successfully!', 'success');
    } catch (error) {
      triggerAlert('Failed to add recipe. Please try again.', 'danger');
    }
  };

  const handleEditRecipe = async (updatedRecipe) => {
    try {
      await updateRecipe(editingRecipe._id, updatedRecipe);
      setEditingRecipe(null); // Clear the form after updating
      fetchRecipes();
      triggerAlert('Recipe updated successfully!', 'success');
    } catch (error) {
      triggerAlert('Failed to update recipe. Please try again.', 'danger');
    }
  };

  const triggerAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
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
            top: 0
          }}
        >
          {alertMessage}
        </div>
      )}

      <div className="container mt-4" id="body">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <RecipeForm
              onSubmit={editingRecipe ? handleEditRecipe : handleAddRecipe}
              initialData={editingRecipe}
              onReset={() => {
                setEditingRecipe(null);
                setIsEditingMode(false); // No unsaved changes after reset
              }}
              onChange={() => setIsEditingMode(true)}
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
                <a href="https://github.com/Danypoz1986" className="text-white text-decoration-none">
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
