import React from 'react'
import RecipeList from './RecipeList'
import '../css/app.css'


function App() {
  return (
    <RecipeList recipes={sampleRecipes} />
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
