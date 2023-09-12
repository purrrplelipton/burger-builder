import React from "react";
import propTypes from "prop-types";

import styles from "./drawerToggle.module.css";

const DrawerToggle = (props) => {
  const stylesAttached = [styles.drawerToggleWrapper, styles.open];
  props.sideDrawerState ? null : stylesAttached.pop();

  const menuStyle = [styles.drawerToggle, styles.open];
  props.sideDrawerState ? null : menuStyle.pop();

  return (
    <div className={stylesAttached.join(" ")} style={{ height: props.height }}>
      <span onClick={props.onClick} className={menuStyle.join(" ")}></span>
    </div>
  );
};

DrawerToggle.propTypes = {
  onClick: propTypes.func,
  sideDrawerState: propTypes.bool,
  height: propTypes.string,
};

export default DrawerToggle;
