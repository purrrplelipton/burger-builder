import pt from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import BuildControl from "./build-control";
import {
  buildControls,
  currentPrice,
  orderButton,
} from "./build-controls.module.css";

const controls = [
  { label: "Lettuce", type: "lettuce" },
  { label: "Patty", type: "patty" },
  { label: "Bacon", type: "bacon" },
  { label: "Pickles", type: "pickles" },
  { label: "Cheese", type: "cheese" },
  { label: "Onion Rings", type: "onion-rings" },
  { label: "Tomato", type: "tomato" },
];

function BuildControls({
  addContent,
  purchasable,
  ordering,
  removeContent,
  disabled,
  price,
}) {
  return (
    <>
      <p className={currentPrice}>
        Current Price:&nbsp;
        <strong>
          ₦&nbsp;
          {price.toFixed(2)}
        </strong>
      </p>
      <div className={buildControls}>
        {controls.map((ctrl) => (
          <BuildControl
            key={uuidv4()}
            label={ctrl.label}
            add={() => addContent(ctrl.type)}
            remove={() => removeContent(ctrl.type)}
            disabled={disabled[ctrl.type]}
          />
        ))}
      </div>
      <button
        type="button"
        className={orderButton}
        disabled={!purchasable}
        onClick={ordering}
      >
        PLACE ORDER
      </button>
    </>
  );
}

BuildControls.propTypes = {
  removeContent: pt.func.isRequired,
  addContent: pt.func.isRequired,
  disabled: pt.shape({
    bacon: pt.bool.isRequired,
    cheese: pt.bool.isRequired,
    lettuce: pt.bool.isRequired,
    "onion-rings": pt.bool.isRequired,
    patty: pt.bool.isRequired,
    pickles: pt.bool.isRequired,
    tomato: pt.bool.isRequired,
  }).isRequired,
  price: pt.number.isRequired,
  purchasable: pt.bool.isRequired,
  ordering: pt.func.isRequired,
};

export default BuildControls;
