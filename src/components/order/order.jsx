import pt from "prop-types";
import React from "react";
import styles from "./order.module.css";

function Order({ details }) {
  const {
    contents,
    customer: {
      address: { street, "zip-code": zipcode },
      email,
      name,
    },
    total,
  } = details;

  return (
    <div className={styles.order}>
      <h2>Contents</h2>
      <p>
        Total&nbsp;:&nbsp;
        {total}
      </p>
    </div>
  );
}

Order.propTypes = {
  details: pt.shape({
    contents: pt.shape({
      lettuce: pt.number.isRequired,
      bacon: pt.number.isRequired,
      cheese: pt.number.isRequired,
      tomato: pt.number.isRequired,
      "onion-ring": pt.number.isRequired,
      patty: pt.number.isRequired,
      pickles: pt.number.isRequired,
    }).isRequired,
    customer: pt.shape({
      name: pt.string.isRequired,
      email: pt.string.isRequired,
      address: pt.shape({ street: pt.string, "zip-code": pt.string.isRequired })
        .isRequired,
    }).isRequired,
    id: pt.string.isRequired,
  }).isRequired,
};

export default Order;
