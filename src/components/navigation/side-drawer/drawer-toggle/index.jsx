import { bool, func } from "prop-types";
import React from "react";
import { bar, drawerToggle, open } from "./drawer-toggle.module.css";

function DrawerToggle({ showSideDrawer, onClick }) {
  return (
    <button
      type="button"
      className={`${drawerToggle} ${showSideDrawer ? open : ""}`}
      onClick={onClick}
      title={showSideDrawer ? "Close side drawer" : "Open side drawer"}
    >
      <span className={bar} />
    </button>
  );
}

DrawerToggle.propTypes = {
  onClick: func.isRequired,
  showSideDrawer: bool.isRequired,
};

export default DrawerToggle;
