import Order from "@components/order/order";
import { Loader } from "@components/ui";
import ErrorHandler from "@src/hoc/error-handler";
import xs from "@src/xs";
import React, { useEffect, useState } from "react";
import styles from "./orders.module.css";

function Orders() {
  const [pageStates, setPageStates] = useState({
    orders: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    setPageStates((prv) => ({ ...prv, loading: true }));
    xs.get("/orders.json")
      .then(({ data }) => {
        if (data) {
          const orderIds = Object.keys(data);
          const orders = [];
          orderIds.forEach((id) => orders.push({ ...data[id], id }));
          setPageStates((prv) => ({ ...prv, orders }));
        }
      })
      .catch((error) => error)
      .finally(() => setPageStates((prv) => ({ ...prv, loading: false })));
  }, []);

  let PageUI = (
    <p className={styles.noOrder}>You have made no orders recently</p>
  );

  if (pageStates.orders.length) {
    PageUI = (
      <section className={styles.ordersWrapper}>
        <h1>Your Orders</h1>
        <ul className={styles.orderList}>
          {pageStates.orders.map((order) => (
            <li key={order.id}>
              <Order details={order} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return pageStates.loading ? <Loader>Getting your orders</Loader> : PageUI;
}

export default ErrorHandler(Orders, xs);
