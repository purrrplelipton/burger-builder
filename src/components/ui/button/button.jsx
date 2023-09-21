import pt from "prop-types";
import React from "react";
import styles from "./button.module.css";

function Button({ variant, type, onClick, children }) {
  return (
    <button
      type={type}
      className={[styles.button, styles[variant]].join(" ")}
      onClick={onClick}
    >
      {children}
      <i className={styles.indicator} />
    </button>
  );
}

Button.defaultProps = { type: "button" };

Button.propTypes = {
  children: pt.oneOfType([pt.node, pt.string]).isRequired,
  onClick: pt.func.isRequired,
  type: pt.oneOf(["submit", "reset"]),
  variant: pt.oneOf(["danger", "success"]).isRequired,
};

export default Button;
