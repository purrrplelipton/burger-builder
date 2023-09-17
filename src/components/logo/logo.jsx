import logo from "@src/assets/images/hamburger-512.png";
import propTypes from "prop-types";
import React from "react";
import styles from "./logo.module.css";

function Logo({ height }) {
  return (
    <div className={styles.logo} style={{ height }}>
      <img src={logo} alt="burger logo" />
    </div>
  );
}

Logo.defaultProps = { height: "auto" };

Logo.propTypes = { height: propTypes.string };

export default Logo;
