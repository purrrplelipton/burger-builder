import propTypes from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import BuildControl from "./buildControl/buildControl";
import {
  buildControls,
  currentPrice,
  orderButton,
} from "./buildControls.module.css";

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
  removeContent: propTypes.func.isRequired,
  addContent: propTypes.func.isRequired,
  disabled: propTypes.object.isRequired,
  price: propTypes.number.isRequired,
  purchasable: propTypes.bool.isRequired,
  ordering: propTypes.func.isRequired,
};

export default BuildControls;
