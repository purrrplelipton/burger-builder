import { string } from "prop-types";
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
  switch (type) {
    case "bread-bottom":
      return <div className={breadBottom} />;

    case "bread-top":
      return (
        <div className={breadTop}>
          <div className={seeds1} />
          <div className={seeds2} />
          <div className={seeds3} />
          <div className={seeds4} />
        </div>
      );

    case "patty":
      return <div className={patty} />;

    case "tomato":
      return <div className={tomato} />;

    case "pickles":
      return <div className={pickles} />;

    case "bacon":
      return <div className={bacon} />;

    case "lettuce":
      return <div className={lettuce} />;

    case "onion-ring":
      return <div className={onionRing} />;

    case "cheese":
      return <div className={cheese} />;

    default:
      return null;
  }
}
BurgerIngredient.propTypes = { type: string.isRequired };

export default BurgerIngredient;
