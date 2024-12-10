# Cookbook Application

The Cookbook Application is a full-stack web project that allows users to create, update, view, and delete recipes. The application is built with the MERN (MongoDB, Express, React, Node.js) stack and demonstrates CRUD operations, dynamic UI updates, and user-friendly design.

## Features

- **Create Recipes**: Add new recipes with details like title, ingredients, preparation steps, and category.
- **View Recipes**: Browse and filter recipes based on categories or search terms.
- **Edit Recipes**: Update existing recipes with ease.
- **Delete Recipes**: Remove recipes from the database.

## Technologies Used

### Frontend
- React.js
- React Router DOM
- Bootstrap and media queries for responsive UI design

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose for object modeling)

## File Structure

### Frontend
- **`src/components/RecipeForm.js`**: Form for adding or editing recipes.
- **`src/components/RecipeCard.js`**: Displays individual recipes in a card layout.
- **`src/pages/HomePage.js`**: Home page with a form for adding recipes.
- **`src/pages/RecipesPage.js`**: Page to view, filter, and manage recipes.

### Backend
- **`server.js`**: Entry point for the backend server.
- **`routes/recipeRoutes.js`**: API routes for CRUD operations.
- **`controllers/recipeController.js`**: Logic for handling recipe-related API requests.
- **`models/recipeModel.js`**: Mongoose schema and model for recipes.

## API Endpoints
### Recipes API
- **GET `/api/recipes`**: Fetch all recipes.
- **POST `/api/recipes`**: Add a new recipe.
- **PATCH `/api/recipes/:id`**: Update a recipe by ID.
- **DELETE `/api/recipes/:id`**: Delete a recipe by ID.

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies for both frontend and backend:
    ```bash
    cd cookbook
    npm install
    cd frontend
    npm install 
    ```
3. Configure the ```.env``` file in the backend:
   ```bash
   MONGO_URI=<my-mongo-database-uri>
   PORT=5000
   ```
4. Start the backend:
   ```bash
   cd backend
   node server.js
   ```
5. Start the frontend:
   ```bash
   cd frontend
   npm start
   ```

## Deployed Application
- Frontend: Render
- Backend: Render

## Additional Resources
- [Video presentation](https://youtu.be/PIcTUJnKgnA)
- [Project report](https://storage.googleapis.com/fullstack3/Project%203%20REACT%20front-end.docx)
- [App webpage](https://cookbook-kn8f.onrender.com)