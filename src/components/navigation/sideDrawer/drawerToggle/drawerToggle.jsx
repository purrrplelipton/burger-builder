import propTypes from "prop-types";
import React from "react";
import { bar, drawerToggle, open } from "./drawerToggle.module.css";

function DrawerToggle({ showSideDrawer, onClick }) {
  return (
    <button
      type="button"
      className={showSideDrawer ? [drawerToggle, open].join(" ") : drawerToggle}
      onClick={onClick}
      title={showSideDrawer ? "Close side drawer" : "Open side drawer"}
    >
      <span className={bar} />
    </button>
  );
}

DrawerToggle.propTypes = {
  onClick: propTypes.func.isRequired,
  showSideDrawer: propTypes.bool.isRequired,
};

export default DrawerToggle;
