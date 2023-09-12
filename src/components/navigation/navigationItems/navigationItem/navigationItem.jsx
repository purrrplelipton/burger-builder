import propTypes from "prop-types";
import React from "react";
import styles from "./navigationItem.module.css";

function NavigationItem({ active, to, children }) {
  return (
    <li className={styles.navigationItem}>
      <a className={active ? styles.active : ""} href={to}>
        {children}
      </a>
    </li>
  );
}

NavigationItem.defaultProps = { active: false };

NavigationItem.propTypes = {
  active: propTypes.bool,
  to: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
};

export default NavigationItem;
