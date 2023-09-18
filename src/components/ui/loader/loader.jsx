import pt from "prop-types";
import React from "react";
import styles from "./loader.module.css";

function Loader({ width, children }) {
  return (
    <div className={styles.loaderWrapper}>
      <span style={{ width }} className={styles.outer} role="progressbar">
        <i className={styles.inner} />
        <i className={styles.inner} />
      </span>
      {children && <p className={styles.loaderText}>{children}</p>}
    </div>
  );
}

Loader.defaultProps = { children: null, width: 48 };

Loader.propTypes = {
  width: pt.number,
  children: pt.string,
};

export default Loader;
