import { func, number, shape, string } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./build-control.module.css";

function BuildControl(props) {
  const { adder, contents, label, remover, type } = props;

  return (
    <div className={styles.buildControl}>
      <p className={styles.label}>{label}</p>
      <div className={styles.btnsWrapper}>
        <button
          type="button"
          className={styles.remove}
          onClick={remover}
          aria-label={`Remove one ${label}`}
          aria-disabled={contents[type] < 1}
        >
          <span className={styles.btnSign}>-</span>
        </button>
        <button
          type="button"
          onClick={adder}
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
  adder: func.isRequired,
  contents: shape({
    bacon: number.isRequired,
    cheese: number.isRequired,
    lettuce: number.isRequired,
    "onion-ring": number.isRequired,
    patty: number.isRequired,
    pickles: number.isRequired,
    tomato: number.isRequired,
  }).isRequired,
  label: string.isRequired,
  remover: func.isRequired,
  type: string.isRequired,
};

const mapStateToProps = (state) => ({ contents: state.contents.contents });

export default connect(mapStateToProps)(BuildControl);
