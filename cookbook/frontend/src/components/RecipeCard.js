const RecipeCard = ({ recipe, onEdit, onDelete }) => (
  <div className="card mb-4 shadow-sm recipe-card">
    <h5 className="card-title">{recipe.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{recipe.category}</h6>
    <p className="card-text">Prep Time: {recipe.prepTime} mins</p>
    <p className="card-text">
      <strong>Ingredients:</strong> {recipe.ingredients}
    </p>
    <p className="card-text">
      <strong>Steps:</strong> {recipe.steps}
    </p>
    <div className="d-flex justify-content-between">
      <button className="btn btn-sm btn-warning" onClick={() => onEdit(recipe)}>Edit</button>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => {
          const confirmed = window.confirm("Are you sure you want to delete this recipe?");
          if (confirmed) {
            onDelete(recipe._id);
          }
        }}
      >
        Delete
      </button>
    </div>
  </div>
);

export default RecipeCard;
