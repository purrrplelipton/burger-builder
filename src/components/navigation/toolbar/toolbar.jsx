import Logo from "@c/logo";
import { NavigationItems } from "@c/navigation";
import DrawerToggle from "@c/navigation/sideDrawer/drawerToggle";
import propTypes from "prop-types";
import React from "react";
import { desktopOnly, logo, toolbar } from "./toolbar.module.css";

function Toolbar({ toggleSideDrawer }) {
  return (
    <header className={toolbar}>
      <DrawerToggle onClick={toggleSideDrawer} height="100%" />
      <div className={logo}>
        <Logo />
      </div>
      <nav className={desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

Toolbar.propTypes = { toggleSideDrawer: propTypes.func.isRequired };

export default Toolbar;
