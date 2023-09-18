import pt from "prop-types";
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
  href: pt.string.isRequired,
  children: pt.string.isRequired,
};

export default NavigationItem;
