import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit';
import { v4 as uuidv4 } from 'uuid';
import Welcome from './Welcome';
import {Route, Routes} from 'react-router-dom'
import Login from './Login';



export const RecipeContext = React.createContext()
//const LOCAL_STORAGE_KEY = 'foodFiesta.recipes'

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const [recipes, setRecipes] = useState([])
  const [userName, setUserName]=useState('')
  const selectedRecipe = recipes && recipes.find(recipe => recipe.id === selectedRecipeId)



  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('https://foofiesta-server-j46h.onrender.com/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {setRecipes(data.data)
         setUserName(data.name)
         console.log(userName)})
        .catch((error) => console.error(error))
    } else {
      console.log('no token')
    }
  }, [])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
    handleSignOut
  }
  



  function handleRecipeSelect(id){
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
  
    const newRecipe = {
      id: uuidv4(),
      name: 'Eg: Scrambled Eggs',
      servings:'1' ,
      cookTime: '1 hr',
      instructions: '1. Crack the eggs into a bowl and whisk them together',
      
      ingredients: [
        { id: uuidv4(), name: 'Eggs', amount: '5  No.' }
      ]
    }

    setRecipes([...recipes, newRecipe])
    setSelectedRecipeId(newRecipe.id)
  }

  



  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }
  function handleSignOut() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  
  return (
    
    <RecipeContext.Provider value={recipeContextValue}>
      
      <Routes>
       <Route path ="/" element ={<Welcome/>}/>
       <Route path ="/login" element ={<Login/>}/>
       <Route path ="/account" element ={<RecipeList recipes={recipes} userName={userName} />}/>
       </Routes>
      {selectedRecipe &&<RecipeEdit recipe={selectedRecipe}/>}
     
    </RecipeContext.Provider>
    
  )
}



export default App;
