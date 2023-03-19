import React from "react";

export default function IngredientEdit({ingredient, handleIngredientChange, handleIngredientDelete}) {

  function handleChange(changes) {
    handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
  }
  return (
    <>
      <input
        className="recipe-input"
        type="text"
        onChange={(e) => handleChange({ name: e.target.value })}
        value={ingredient.name}
      />
      <input
        className="recipe-input"
        type="text"
        onChange={(e) => handleChange({ amount: e.target.value })}
        value={ingredient.amount}
      />
      <button className="danger"
        onClick={() => handleIngredientDelete(ingredient.id)}
      >
        &times;
      </button>
     
    </>
  )
}
