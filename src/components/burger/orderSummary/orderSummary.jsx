import { Button } from "@components/ui";
import PropTypes from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function OrderSummary({ contents, cancelPurchase, totalPrice, checkout }) {
  const contentSummary = Object.keys(contents).map((contentKey) => (
    <li key={uuidv4()}>
      <span style={{ textTransform: "capitalize" }}>{contentKey}</span>
      :&nbsp;
      {contents[contentKey]}
    </li>
  ));

  return (
    <>
      <h3>Your Order</h3>
      <p>A burger with the following contents:</p>
      <ul style={{ paddingInlineStart: "1.25em" }}>{contentSummary}</ul>
      <p>
        Total: ₦<strong>{totalPrice.toFixed(2)}</strong>
      </p>
      <p>Checkout?</p>
      <Button btnType="danger" onClick={cancelPurchase}>
        CANCEL
      </Button>
      <Button btnType="success" onClick={checkout}>
        CONTINUE
      </Button>
    </>
  );
}

OrderSummary.propTypes = {
  contents: PropTypes.shape({
    lettuce: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    tomato: PropTypes.number.isRequired,
    "onion-rings": PropTypes.number.isRequired,
    patty: PropTypes.number.isRequired,
    pickles: PropTypes.number.isRequired,
  }).isRequired,
  cancelPurchase: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default OrderSummary;
