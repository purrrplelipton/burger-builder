import pt from "prop-types";
import React from "react";
import styles from "./build-control.module.css";

function BuildControl({ add, remove, label, disabled }) {
  return (
    <div className={styles.buildControl}>
      <p className={styles.label}>{label}</p>
      <div className={styles.btnsWrapper}>
        <button
          type="button"
          className={styles.remove}
          onClick={remove}
          aria-label={`Remove one ${label}`}
          disabled={disabled}
        >
          <span className={styles.btnSign}>-</span>
        </button>
        <button
          type="button"
          onClick={add}
          className={styles.add}
          aria-label={`Add one ${label}`}
        >
          <span className={styles.btnSign}>+</span>
        </button>
      </div>
    </div>
  );
}

BuildControl.propTypes = {
  label: pt.string.isRequired,
  remove: pt.func.isRequired,
  add: pt.func.isRequired,
  disabled: pt.bool.isRequired,
};

export default BuildControl;
