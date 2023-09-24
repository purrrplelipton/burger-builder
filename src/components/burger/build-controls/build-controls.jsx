import pt from "prop-types";
import React from "react";
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
  addContent,
  purchasable,
  ordering,
  removeContent,
  disabled,
  price,
}) {
  return (
    <>
      <div className={topSection}>
        <p className={currentPrice}>
          Total&nbsp;~&nbsp;
          <strong>
            ₦&nbsp;
            {price.toFixed(2)}
          </strong>
        </p>
        <button
          type="button"
          className={orderButton}
          aria-disabled={!purchasable}
          onClick={purchasable ? ordering : null}
        >
          PLACE ORDER
        </button>
      </div>
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
    "onion-ring": pt.bool.isRequired,
    patty: pt.bool.isRequired,
    pickles: pt.bool.isRequired,
    tomato: pt.bool.isRequired,
  }).isRequired,
  price: pt.number.isRequired,
  purchasable: pt.bool.isRequired,
  ordering: pt.func.isRequired,
};

export default BuildControls;
