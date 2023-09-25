import { element, node, oneOfType, string } from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./navigation-item.module.css";

function NavigationItem({ href, children }) {
  return (
    <li className={styles.navigationItem}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.active : "")}
        to={href}
      >
        {children}
      </NavLink>
    </li>
  );
}

NavigationItem.propTypes = {
  href: string.isRequired,
  children: oneOfType([string, element, node]).isRequired,
};

export default NavigationItem;
