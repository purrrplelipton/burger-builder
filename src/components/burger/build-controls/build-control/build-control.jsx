import { Loader } from "@components/ui";
import { bool, func, number, shape, string } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "./build-control.module.css";

function BuildControl(props) {
  const { adder, contents, label, loading, remover, type } = props;

  return loading ? (
    <Loader />
  ) : (
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
  loading: bool.isRequired,
  label: string.isRequired,
  remover: func.isRequired,
  type: string.isRequired,
};

const mapStateToProps = (state) => {
  const { contents, loading } = state.contents;
  return { contents, loading };
};

export default connect(mapStateToProps)(BuildControl);
