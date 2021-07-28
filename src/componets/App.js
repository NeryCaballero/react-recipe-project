import React,  { useState, useEffect } from 'react'
import RecipeList from './RecipeList'
import RecipeEdit from './RecipeEdit';
import Title from './Title';
import '../css/app.css';
import { v4 as uuidv4 } from 'uuid';


export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'reactRecipeProject.recipes'

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])


  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeEdit,
    handleRecipeChange,
    handleRecipeDelete
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      servings: 1,
      cookTime: '',
      instructions: '',
      ingredients: [
        {id: uuidv4(), name: '', amount: ''}
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeEdit(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeChange(id, recipe) {
      const newRecipe = [...recipes]
      const index = newRecipe.findIndex(r => r.id === id)
      newRecipe[index] = recipe
      setRecipes(newRecipe)
  }

  function handleRecipeDelete(id) {
    if (selectedRecipe != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <Title />
      <div className='main'>
        <RecipeList recipes={recipes} />
        {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
      </div>
    </RecipeContext.Provider>
    
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Guacamole',
    servings: 3,
    cookTime: '0:25',
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
      },
      {
        id: 3,
        name: 'Parsley',
        amount: '2 tbsp'
      },
      {
        id: 4,
        name: 'Lime Juice',
        amount: '1 tbsp'
      }, 
      {
        id: 5,
        name: 'Salt&Pepper',
        amount: 'To taste'
      }
    ]
  },
  {
    id: 2,
    name: 'PB&J Sandwich',
    servings: 1,
    cookTime: '0:05',
    instructions: "1. Ddddd\n2. Bbbbb\n3. Ccccc",
    ingredients: [
      {
        id: 1,
        name: 'Bread',
        amount: 2
      },
      {
        id: 2,
        name: 'Peanut Buuter',
        amount: '2 tbsp'
      },
      {
        id: 3,
        name: 'Jam',
        amount: '1 tbsp'
      }
    ]
  }
]

export default App;
