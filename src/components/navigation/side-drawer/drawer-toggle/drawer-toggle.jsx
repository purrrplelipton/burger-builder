import pt from "prop-types";
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
  onClick: pt.func.isRequired,
  showSideDrawer: pt.bool.isRequired,
};

export default DrawerToggle;
