import pt from "prop-types";
import React from "react";
import styles from "./button.module.css";

function Button({ type, onClick, ...rest }) {
  return (
    <button
      type={type}
      className={[styles.button, styles[rest.variant]].join(" ")}
      onClick={onClick}
      aria-disabled={rest.disabled}
    >
      {rest.children}
      <i className={styles.indicator} />
    </button>
  );
}

Button.defaultProps = { type: "button", onClick: () => {} };

Button.propTypes = {
  onClick: pt.func,
  type: pt.oneOf(["submit", "reset", "button"]),
};

export default Button;
