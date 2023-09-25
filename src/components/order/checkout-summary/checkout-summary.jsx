import { Burger } from "@components/burger";
import { Button } from "@components/ui";
import { func, number, shape } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles, { checkoutSummary } from "./checkout-summary.module.css";

function CheckoutSummary(props) {
  const { contents, cancel, proceed } = props;
  return (
    <section className={checkoutSummary}>
      <h1>Hope you enjoy!</h1>
      <div>
        <Burger ingredients={contents} />
      </div>
      <fieldset className={styles["cta-wrapper"]}>
        <Button variant="blue-grey" onClick={cancel}>
          CANCEL
        </Button>
        <Button variant="light-green" onClick={proceed}>
          CONTINUE
        </Button>
      </fieldset>
    </section>
  );
}

CheckoutSummary.propTypes = {
  contents: shape({
    lettuce: number.isRequired,
    bacon: number.isRequired,
    cheese: number.isRequired,
    tomato: number.isRequired,
    patty: number.isRequired,
    pickles: number.isRequired,
    "onion-ring": number.isRequired,
  }).isRequired,
  cancel: func.isRequired,
  proceed: func.isRequired,
};

const mapStateToProps = (state) => ({
  contents: state.contentsReducer.contents,
});

export default connect(mapStateToProps)(CheckoutSummary);
