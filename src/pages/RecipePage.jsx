import React, {Image } from "react";
import { useParams } from "react-router-dom";

function Recipe(props) {
  let { label } = useParams();

  // Find the selected recipe based on the label
  // const selectedRecipe = props.data.find(
  //   (recipe) => recipe.recipe.label == label
  // );
  const selectedRecipe = props.data;
  console.log(selectedRecipe);

  // if (!selectedRecipe) {
  //   return <div>Recipe not found</div>;
  // }

  return (
    <div>
      <h1>{selectedRecipe.recipe.label}</h1>
      <img 
        src={selectedRecipe.recipe.image}
        style={{height: 300, width: 300}} />
      <h2>Ingredients:</h2>
      <ul>
        {selectedRecipe.recipe.ingredientLines.map((ingredient) => <li>{ingredient}</li>)}
      </ul>
    </div>
  );
}

export default Recipe;
