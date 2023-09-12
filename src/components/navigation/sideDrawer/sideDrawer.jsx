import Logo from "@components/logo";
import { NavigationItems } from "@components/navigation";
import { Backdrop } from "@components/ui";
import propTypes from "prop-types";
import React from "react";
import DrawerToggle from "./drawerToggle";
import { hidden, logo, sideDrawer, topSection } from "./sideDrawer.module.css";

function SideDrawer({ showSideDrawer, exitSideDrawer }) {
  return (
    <>
      <Backdrop show={showSideDrawer} onClick={exitSideDrawer} />
      <div
        className={showSideDrawer ? sideDrawer : [sideDrawer, hidden].join(" ")}
      >
        <header className={topSection}>
          <div className={logo}>
            <Logo />
          </div>
          <DrawerToggle
            showSideDrawer={showSideDrawer}
            onClick={exitSideDrawer}
          />
        </header>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
}

SideDrawer.propTypes = {
  showSideDrawer: propTypes.bool.isRequired,
  exitSideDrawer: propTypes.func.isRequired,
};

export default SideDrawer;
