import propTypes from "prop-types";
import React from "react";

import styles from "./buildControl.module.css";

function BuildControl({ add, remove, label, disabled }) {
  return (
    <div className={styles.buildControl}>
      <div className={styles.label}>{label}</div>
      <button
        type="button"
        className={styles.remove}
        onClick={remove}
        disabled={disabled}
      >
        Remove
      </button>
      <button type="button" className={styles.add} onClick={add}>
        Add
      </button>
    </div>
  );
}

BuildControl.propTypes = {
  label: propTypes.string.isRequired,
  remove: propTypes.func.isRequired,
  add: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
};

export default BuildControl;
