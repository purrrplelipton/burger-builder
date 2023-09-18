import { Burger } from "@components/burger";
import { Button } from "@components/ui";
import pt from "prop-types";
import React from "react";
import { checkoutSummary } from "./checkout-summary.module.css";

function CheckoutSummary({ ingredients, cancel, proceed }) {
  return (
    <section className={checkoutSummary}>
      <h1>Hope you enjoy!</h1>
      <div>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="danger" onClick={cancel}>
        CANCEL
      </Button>
      <Button btnType="success" onClick={proceed}>
        CONTINUE
      </Button>
    </section>
  );
}

CheckoutSummary.propTypes = {
  ingredients: pt.shape({
    lettuce: pt.number.isRequired,
    bacon: pt.number.isRequired,
    cheese: pt.number.isRequired,
    tomato: pt.number.isRequired,
    patty: pt.number.isRequired,
    pickles: pt.number.isRequired,
    "onion-ring": pt.number.isRequired,
  }).isRequired,
  cancel: pt.func.isRequired,
  proceed: pt.func.isRequired,
};

export default CheckoutSummary;
