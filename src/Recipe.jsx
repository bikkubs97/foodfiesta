import React, { useContext } from "react";
import IngredientList from "./IngredientList";
import { RecipeContext } from "./App";

export default function Recipe({ name, cookTime, servings, instructions, ingredients , id}) {
 const {handleRecipeDelete, handleRecipeSelect} = useContext(RecipeContext) 
  
  return (
    <div className="recipe">
      <div className="recipe-name">
      <div>
        <h1>{name}</h1>
      </div>

      <div>
        <button className="green" onClick={()=>handleRecipeSelect(id)}
        
        >Edit</button>

        <button className="danger" onClick={()=>handleRecipeDelete(id)}>Delete</button>
      </div>
      </div>
     
      <div className="recipe-row">
        <span className="recipe-head">Servings : </span>
        <span >{servings}</span>
      </div>
      <div className="recipe-row">
        <span>Cook Time :</span>
        <span >{cookTime}</span>
      </div>
      <div className="recipe-row">
        <span className="recipe-head"><b>Instructions:</b></span>
        <div className="recipe-text">{instructions}</div>
      </div>
    
      <div className="ing">
        <span className="recipe-head"><b>Ingredients:</b></span>
        <div>
          <IngredientList className="recipet-text" ingredients={ingredients} />
        </div>
      </div>
    
      
    </div>
  )
}
