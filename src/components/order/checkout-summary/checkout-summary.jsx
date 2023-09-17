import { Burger } from "@components/burger";
import { Button } from "@components/ui";
import PropTypes from "prop-types";
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
  ingredients: PropTypes.shape({
    lettuce: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    tomato: PropTypes.number.isRequired,
    patty: PropTypes.number.isRequired,
    pickles: PropTypes.number.isRequired,
    "onion-ring": PropTypes.number.isRequired,
  }).isRequired,
  cancel: PropTypes.func.isRequired,
  proceed: PropTypes.func.isRequired,
};

export default CheckoutSummary;
