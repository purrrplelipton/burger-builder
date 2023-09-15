import logo from "@src/assets/images/hamburger-512.png";
import propTypes from "prop-types";
import React from "react";

function Logo({ height }) {
  return (
    <div style={{ height }}>
      <img src={logo} alt="burger logo" />
    </div>
  );
}

Logo.defaultProps = { height: "auto" };

Logo.propTypes = { height: propTypes.string };

export default Logo;
