import pt from "prop-types";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./order.module.css";

function Order({ details }) {
  const { contents, total, id } = details;

  const contentList = (
    <div className={styles.contentsWrapper} key={id}>
      {Object.entries(contents)
        .filter(([, amount]) => amount !== 0)
        .map(([name, amount]) => (
          <span key={uuidv4()}>
            {name}({amount})
          </span>
        ))}
    </div>
  );

  return (
    <div className={styles.order}>
      <h2>Contents</h2>
      {contentList}
      <p className={styles.orderTotal}>
        Total:&nbsp;₦
        <strong>{total}</strong>
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
    total: pt.number.isRequired,
    id: pt.string.isRequired,
  }).isRequired,
};

export default Order;
