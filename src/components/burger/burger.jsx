import { Loader } from "@components/ui";
import { bool, number, shape } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import BurgerIngredient from "./burger-ingredient";
import { burgerWrapper } from "./burger.module.css";

function Burger({ contents, loading }) {
  let mappedContents = null;
  if (contents) {
    mappedContents = Object.keys(contents)
      .map((type) =>
        [...Array(contents[type])].map(() => (
          <BurgerIngredient key={uuidv4()} type={type} />
        ))
      )
      .reduce((array, cn) => [...array, cn], []);
    if (mappedContents.length === 0) {
      mappedContents = <p>Add some contents to your burger!</p>;
    }
  }

  return loading ? (
    <Loader>Just a little longer...</Loader>
  ) : (
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
  loading: bool.isRequired,
};

const mapStateToProps = (state) => {
  const { contents, loading } = state.contents;
  return { contents, loading };
};

export default connect(mapStateToProps)(Burger);
