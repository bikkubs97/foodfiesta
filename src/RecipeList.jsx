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
    <button className="danger" onClick={handleSignOut}>Sign Out</button>
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
    </div>
    <button className="green" onClick={handleRecipeAdd}>
      Add Recipe</button><br/>
    

    <button className="green" onClick={handleUpdate}> Save changes</button>
    <div className="img"></div>
   
    </div>
    </div>
  )


  function handleUpdate() {
    const token = localStorage.getItem('token')
    fetch('https://foofiesta-server.onrender.com/users/data', {
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







