import burger_logo from "@src/assets/images/hamburger-512.png";
import propTypes from "prop-types";
import React from "react";
import { logo } from "./logo.module.css";

function Logo({ height }) {
  return (
    <div className={logo} style={{ height }}>
      <img src={burger_logo} alt="burger logo" />
    </div>
  );
}
Logo.propTypes = { height: propTypes.string };

export default Logo;
