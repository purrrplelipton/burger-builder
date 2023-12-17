import { number, shape } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import BurgerIngredient from "./burger-ingredient";
import { burgerWrapper } from "./burger.module.css";

function Burger({ contents }) {
  let mappedContents = null;
  if (contents) {
    mappedContents = Object.keys(contents)
      .map((type) =>
        [...Array(contents[type])].map(() => (
          <BurgerIngredient key={uuidv4()} type={type} />
        ))
      )
      .reduce((array, cn) => [...array, cn], []);
    if (mappedContents.every((cn) => cn.length === 0)) {
      mappedContents = <p>Add some contents to your burger!</p>;
    }
  }

  return (
    <div className={burgerWrapper}>
      <BurgerIngredient type="bread-top" />
      {mappedContents}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

Burger.propTypes = {
  contents: shape({
    lettuce: number.isRequired,
    bacon: number.isRequired,
    cheese: number.isRequired,
    tomato: number.isRequired,
    "onion-ring": number.isRequired,
    patty: number.isRequired,
    pickles: number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ contents: state.contents.contents });

export default connect(mapStateToProps)(Burger);
