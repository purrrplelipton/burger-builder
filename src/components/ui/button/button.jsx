import pt from "prop-types";
import React from "react";
import styles from "./button.module.css";

function Button({ btnType, onClick, children }) {
  return (
    <button
      type="button"
      className={[styles.button, styles[btnType]].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: pt.oneOfType([pt.node, pt.string]).isRequired,
  onClick: pt.func.isRequired,
  btnType: pt.oneOf(["danger", "success"]).isRequired,
};

export default Button;
