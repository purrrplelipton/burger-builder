import Logo from "@c/logo";
import { NavigationItems } from "@c/navigation";
import { Backdrop } from "@c/ui";
import propTypes from "prop-types";
import React from "react";
import DrawerToggle from "./drawerToggle";
import { closed, logo, sideDrawer } from "./sideDrawer.module.css";

function SideDrawer({ showSideDrawer, exitSideDrawer }) {
  const stylesAttached = [sideDrawer, closed];
  if (showSideDrawer) stylesAttached.pop();

  return (
    <>
      <Backdrop showModal={showSideDrawer} exitModal={exitSideDrawer} />
      <div className={stylesAttached.join(" ")}>
        <div className={logo}>
          <Logo />
        </div>
        <DrawerToggle
          height="48px"
          sideDrawerState={showSideDrawer}
          onClick={exitSideDrawer}
        />
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
