import { Button } from "@components/ui";
import pt from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";

function OrderSummary({ contents, cancelPurchase, totalPrice, checkout }) {
  const contentSummary = Object.keys(contents).map((contentKey) => (
    <li key={uuidv4()}>
      <span style={{ textTransform: "capitalize" }}>{contentKey}</span>
      &nbsp;:&nbsp;
      {contents[contentKey]}
    </li>
  ));

  return (
    <>
      <h3>Your Order</h3>
      <p>A burger with the following contents:</p>
      <ul style={{ paddingInlineStart: "1.25em" }}>{contentSummary}</ul>
      <p>
        Total&nbsp;~&nbsp;₦
        <strong>{totalPrice.toFixed(2)}</strong>
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
  contents: pt.shape({
    lettuce: pt.number.isRequired,
    bacon: pt.number.isRequired,
    cheese: pt.number.isRequired,
    tomato: pt.number.isRequired,
    "onion-ring": pt.number.isRequired,
    patty: pt.number.isRequired,
    pickles: pt.number.isRequired,
  }).isRequired,
  cancelPurchase: pt.func.isRequired,
  checkout: pt.func.isRequired,
  totalPrice: pt.number.isRequired,
};

export default OrderSummary;
