import React,  { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import '../css/app.css'
import { v4 as uuidv4 } from 'uuid';
// import Recipe from './Recipe';

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'reactRecipeProject.recipes'

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: 'New',
      servings: 1,
      cookTime: '1:00',
      instructions: 'Instructions',
      ingredients: [
        {id: uuidv4(), name: 'Name', amount: '1 tbs.'}
      ]
    }

    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
    </RecipeContext.Provider>
    
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Recipe 1',
    servings: 3,
    cookTime: '0:15',
    instructions: "1. Aaaaa\n2. Bbbbb\n3. Ccccc",
    ingredients: [
      {
        id: 1,
        name: 'Avocado',
        amount: 2
      },
      {
        id: 2,
        name: 'Tomato',
        amount: 1
      }
    ]
  },
  {
    id: 2,
    name: 'Recipe 2',
    servings: 5,
    cookTime: '0:10',
    instructions: "1. Ddddd\n2. Bbbbb\n3. Ccccc",
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        amount: 3
      },
      {
        id: 2,
        name: 'Hummus',
        amount: 3
      }
    ]
  }
]

export default App;
