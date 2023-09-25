import { Button } from "@components/ui";
import { func, number, shape } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function OrderSummary({ cancelPurchase, contents, total }) {
  const navigate = useNavigate();

  const contentSummary = Object.keys(contents).map((type) => {
    if (contents[type] > 0) {
      return (
        <li
          key={uuidv4()}
          style={{
            display: "flex",
            flexFlow: "row nowrap",
            alignItems: "center",
            gap: 14,
          }}
        >
          <p style={{ textTransform: "capitalize" }}>{type}</p>
          :&ZeroWidthSpace;
          <p>{contents[type]}</p>
        </li>
      );
    }
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A burger with the following contents:</p>
      <ul style={{ paddingLeft: "1.25em" }}>{contentSummary}</ul>
      <p>
        Total&nbsp;~&nbsp;₦
        <strong>{total}</strong>
      </p>
      <p>Checkout?</p>
      <fieldset
        style={{
          border: "unset",
          margin: "0.875em 0 0.375em",
          display: "flex",
          flexFlow: "row nowrap",
          alignItems: "center",
          gap: "0.875em",
        }}
      >
        <Button variant="blue-grey" onClick={cancelPurchase}>
          CANCEL
        </Button>
        <Button variant="light-green" onClick={() => navigate("/checkout")}>
          CONTINUE
        </Button>
      </fieldset>
    </>
  );
}

OrderSummary.propTypes = {
  cancelPurchase: func.isRequired,
  contents: shape({
    lettuce: number.isRequired,
    bacon: number.isRequired,
    cheese: number.isRequired,
    tomato: number.isRequired,
    "onion-ring": number.isRequired,
    patty: number.isRequired,
    pickles: number.isRequired,
  }).isRequired,
  total: number.isRequired,
};

const mapStateToProps = (state) => {
  const { contents, total } = state.contents;
  return { contents, total };
};

export default connect(mapStateToProps)(OrderSummary);
