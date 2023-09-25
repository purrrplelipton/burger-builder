import { number, oneOfType, shape, string } from "prop-types";
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
  details: shape({
    contents: shape({
      lettuce: number.isRequired,
      bacon: number.isRequired,
      cheese: number.isRequired,
      tomato: number.isRequired,
      "onion-ring": number.isRequired,
      patty: number.isRequired,
      pickles: number.isRequired,
    }).isRequired,
    customer: shape({
      name: string.isRequired,
      email: string.isRequired,
      address: shape({
        street: string,
        "zip-code": oneOfType([string, number]).isRequired,
      }).isRequired,
    }).isRequired,
    total: number.isRequired,
    id: string.isRequired,
  }).isRequired,
};

export default Order;
