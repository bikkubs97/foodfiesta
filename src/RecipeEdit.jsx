import React from "react"
import { useContext } from "react"
import { RecipeContext } from "./App"
import { v4 as uuidv4 } from 'uuid';
import IngredientEdit from "./IngredientEdit"


export default function RecipeEdit({recipe}) {
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)
 
    function handleChange(changes){
        handleRecipeChange(recipe.id, {...recipe,...changes})
    }
    function handleIngredientChange(id, ingredient){
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex( i=> i.id === id)
        newIngredients[index] = ingredient
        handleChange({ingredients:newIngredients})

    }

    function handleIngredientAdd(){
        const newIngredient = {
            id : uuidv4(),
            name : '',
            amount : '',


        }

        handleChange({ingredients:[...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id){
        handleChange({ingredients: recipe.ingredients.filter(i => i.id !== id)})
    }
    


    return (
        <div className="recipe-edit">
            <div className="recipe-edit-remove">
                <button className="danger" onClick={()=>handleRecipeSelect(undefined)}>&times;</button>
            </div>
        
                
            <div className="grid">            
                
            <div>
                <label htmlFor="name" className="recipe-label">Name : </label> <br/>
            
                <input type="text" className="recipe-input" name="name" value={recipe.name} id="name" onChange={e => handleChange({name:e.target.value})} /><br/>
            </div>
            <div>
                <label className="recipe-label" htmlFor="servings">Servings :</label><br/>
                <input className="recipe-input" type="text" name="cookTime" value={recipe.servings}  id="servings" onChange={e => handleChange({servings:e.target.value})}/>
            </div>
            <div>
                <label className="recipe-label" htmlFor="cookTime">Cook Time :</label><br/>
                <input className="recipe-input" type="text" name="cookTime" value={recipe.cookTime}  id="cookTime" onChange={e => handleChange({cookTime:e.target.value})}/>
            </div>
            
            <div>
                <label className="recipe-label" htmlFor="instructions" >Instructions :</label><br/>
                <textarea className="recipe-input"  name="instructions" value={recipe.instructions} id="instructions" onChange={e => handleChange({instructions:e.target.value})}/>
            </div>
            
            </div> 
    
            
            <br/>
            <label className="recipe-label">Ingredients</label>
            <div className="ingredient-grid"> 
                {recipe.ingredients.map(ingredient => (
                    <IngredientEdit
                        key={ingredient.id}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                        ingredient={ingredient}
                    />
                ))}
            </div>
            <div>
                <button className="green" onClick={()=>handleIngredientAdd()}>Add Ingredient</button>
            </div>
        </div>
    )

   }