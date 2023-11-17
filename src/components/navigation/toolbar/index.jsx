import { bool, func } from "prop-types";
import React from "react";
import Logo from "src/components/logo";
import { NavigationItems } from "src/components/navigation";
import DrawerToggle from "src/components/navigation/side-drawer/drawer-toggle";
import { desktopOnly, logo, toolbar } from "./toolbar.module.css";

function Toolbar({ showSideDrawer, toggleSideDrawer }) {
  return (
    <header className={toolbar}>
      <DrawerToggle
        showSideDrawer={showSideDrawer}
        onClick={toggleSideDrawer}
      />
      <div className={logo}>
        <Logo />
      </div>
      <nav className={desktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
}

Toolbar.propTypes = {
  toggleSideDrawer: func.isRequired,
  showSideDrawer: bool.isRequired,
};

export default Toolbar;
