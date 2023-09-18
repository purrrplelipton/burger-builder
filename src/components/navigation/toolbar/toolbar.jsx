import Logo from "@components/logo";
import { NavigationItems } from "@components/navigation";
import DrawerToggle from "@components/navigation/side-drawer/drawer-toggle";
import pt from "prop-types";
import React from "react";
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
  toggleSideDrawer: pt.func.isRequired,
  showSideDrawer: pt.bool.isRequired,
};

export default Toolbar;
