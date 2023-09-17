import propTypes from "prop-types";
import React from "react";
import {
  bacon,
  breadBottom,
  breadTop,
  cheese,
  lettuce,
  onionRing,
  patty,
  pickles,
  seeds1,
  seeds2,
  seeds3,
  seeds4,
  tomato,
} from "./burger-ingredient.module.css";

function BurgerIngredient({ type }) {
  let ingredient = null;

  switch (type) {
    case "bread-bottom":
      ingredient = <div className={breadBottom} />;
      break;
    case "bread-top":
      ingredient = (
        <div className={breadTop}>
          <div className={seeds1} />
          <div className={seeds2} />
          <div className={seeds3} />
          <div className={seeds4} />
        </div>
      );
      break;
    case "patty":
      ingredient = <div className={patty} />;
      break;
    case "tomato":
      ingredient = <div className={tomato} />;
      break;
    case "pickles":
      ingredient = <div className={pickles} />;
      break;
    case "bacon":
      ingredient = <div className={bacon} />;
      break;
    case "lettuce":
      ingredient = <div className={lettuce} />;
      break;
    case "onion-ring":
      ingredient = <div className={onionRing} />;
      break;
    case "cheese":
      ingredient = <div className={cheese} />;
      break;

    default:
      ingredient = null;
      break;
  }
  return ingredient;
}

BurgerIngredient.propTypes = { type: propTypes.string.isRequired };

export default BurgerIngredient;
