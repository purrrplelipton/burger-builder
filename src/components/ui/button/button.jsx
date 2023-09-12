import propTypes from "prop-types";
import React from "react";
import { button } from "./button.module.css";

function Button({ btnType, onClick, children }) {
  return (
    <button
      type="button"
      className={[button, btnType].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: propTypes.oneOfType([propTypes.node, propTypes.string]).isRequired,
  onClick: propTypes.func.isRequired,
  btnType: propTypes.oneOf(["danger", "success"]).isRequired,
};

export default Button;
