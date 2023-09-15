import PropTypes from "prop-types";
import React from "react";
import { Router } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import BurgerIngredient from "./burger-ingredient";
import { burger } from "./burger.module.css";

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

Burger.propTypes = {
  ingredients: PropTypes.shape({
    lettuce: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    tomato: PropTypes.number.isRequired,
    "onion-rings": PropTypes.number.isRequired,
    patty: PropTypes.number.isRequired,
    pickles: PropTypes.number.isRequired,
  }).isRequired,
};

export default Burger;
