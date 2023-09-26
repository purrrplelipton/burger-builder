import { contents as contentsActions } from "@store/actions";
import { func, number, shape } from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import BuildControl from "./build-control";
import {
  buildControls,
  currentPrice,
  orderButton,
  topSection,
} from "./build-controls.module.css";

const controls = [
  { label: "Patty", type: "patty" },
  { label: "Cheese", type: "cheese" },
  { label: "Pickles", type: "pickles" },
  { label: "Lettuce", type: "lettuce" },
  { label: "Bacon", type: "bacon" },
  { label: "Onion Ring", type: "onion-ring" },
  { label: "Tomato", type: "tomato" },
];

function BuildControls({
  ADD_CONTENT,
  contents,
  proceed,
  REMOVE_CONTENT,
  total,
}) {
  const [purchasable, setPurchasable] = useState(false);

  useEffect(() => {
    if (contents) {
      const canPurchase = Object.values(contents).some((val) => val > 0);
      setPurchasable(canPurchase);
    }
    return () => {};
  }, [contents]);
  return (
    <>
      <div className={topSection}>
        <p className={currentPrice}>
          Total&nbsp;~&nbsp;
          <strong>
            ₦&nbsp;
            {total}
          </strong>
        </p>
        <button
          type="button"
          className={orderButton}
          aria-disabled={!purchasable}
          onClick={purchasable ? proceed : null}
        >
          PLACE ORDER
        </button>
      </div>
      <div className={buildControls}>
        {controls.map(({ label, type }) => (
          <BuildControl
            key={uuidv4()}
            type={type}
            label={label}
            adder={() => ADD_CONTENT(type)}
            remover={() => REMOVE_CONTENT(type)}
          />
        ))}
      </div>
    </>
  );
}

BuildControls.propTypes = {
  ADD_CONTENT: func.isRequired,
  contents: shape({
    bacon: number.isRequired,
    cheese: number.isRequired,
    lettuce: number.isRequired,
    "onion-ring": number.isRequired,
    patty: number.isRequired,
    pickles: number.isRequired,
    tomato: number.isRequired,
  }).isRequired,
  proceed: func.isRequired,
  REMOVE_CONTENT: func.isRequired,
  total: number.isRequired,
};

const mapStateToProps = (state) => {
  const { contents, total } = state.contents;
  return { contents, total };
};

const mapDispatchToProps = (dispatch) => ({
  ADD_CONTENT: (type) => dispatch(contentsActions.addContent(type)),
  REMOVE_CONTENT: (type) => dispatch(contentsActions.removeContent(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildControls);
