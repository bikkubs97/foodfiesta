import React, { useContext } from "react";
import Recipe from "./Recipe";
import  {RecipeContext} from './App'

export default function RecipeList({ recipes, userName}) {
  const {handleRecipeAdd, handleSignOut} = useContext(RecipeContext)
  return (
    <div className="recipe-list-container">

    <div className="list-header">
    <div className="fd">
    <span className="food">Food</span>
      <span className="fiesta">Fiesta</span>

    </div>
    <div className="user">
    <h1>Welcome {userName} !</h1 >
    <button className="add" onClick={handleRecipeAdd}>
      Add Recipe</button><br/>
    

    <button className="add" onClick={handleUpdate}> Save changes</button>
    
    <button className="add" onClick={handleSignOut}>Sign Out</button>
    </div>
    </div>
    <div className="recipe-list">
   
   
    <h2>My Recipes</h2>
    <div className="recipe-list"> 
    
      {recipes.map(recipe => (
        <Recipe key={recipe.id}
         {...recipe}  
                 
         />
        
      ))}
       {recipes.length==0&&<div>You have no recipes! Click on Add recipe to start cooking.</div>}
    </div>

  
    <div className="img"></div>
   
    </div>
    </div>
  )


  function handleUpdate() {
    const token = localStorage.getItem('token')
    fetch('https://foofiesta-server-j46h.onrender.com/users/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        data: recipes
  
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      console.log('User data updated:', data)
      window.alert('Changes Saved Successfully!')
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error)
    })
  }
  
  
  
  
  
}







