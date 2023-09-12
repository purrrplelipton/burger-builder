import PropTypes from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { burger } from "./burger.module.css";
import BurgerIngredient from "./burgerIngredients/burgerIngredients";

function Burger({ ingredients }) {
  let transformedIngredients = Object.keys(ingredients)
    .map((ingredientKey) =>
      [...Array(ingredients[ingredientKey])].map(() => (
        <BurgerIngredient key={uuidv4()} type={ingredientKey} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Add some contents to your burger!</p>;
  }

  return (
    <div className={burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

Burger.propTypes = { ingredients: PropTypes.object.isRequired };

export default Burger;
