import React from "react";
import propTypes from "prop-types";

import styles from "./navigationItem.module.css";

const NavigationItem = ({ active, destination, children }) => (
  <li className={styles.navigationItem}>
    <a className={active ? styles.active : null} href={destination}>
      {children}
    </a>
  </li>
);

NavigationItem.propTypes = {
  active: propTypes.bool,
  destination: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
};

export default NavigationItem;
