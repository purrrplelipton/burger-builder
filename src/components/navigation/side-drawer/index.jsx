import { bool, func } from "prop-types";
import React, { useEffect, useState } from "react";
import Logo from "src/components/logo";
import { NavigationItems } from "src/components/navigation";
import { Backdrop } from "src/components/ui";
import DrawerToggle from "./drawer-toggle";
import {
  logo,
  sideDrawer,
  slideOut,
  topSection,
} from "./side-drawer.module.css";

function SideDrawer({ showSideDrawer, exitSideDrawer }) {
  const [visible, setVisibility] = useState(false);
  const [classList, setClassList] = useState([sideDrawer, slideOut]);

  useEffect(() => {
    if (showSideDrawer) {
      setVisibility(true);
      const reveal$delay = setTimeout(
        () => setClassList((prv) => [...prv, slideOut]),
        50
      );
      return () => clearTimeout(reveal$delay);
    }
    setClassList((prv) => prv.filter((cn) => cn !== slideOut));
    const removal$delay = setTimeout(() => setVisibility(false), 350);
    return () => clearTimeout(removal$delay);
  }, [showSideDrawer]);

  return (
    visible && (
      <>
        <Backdrop show={showSideDrawer} onClick={exitSideDrawer} />
        <div className={classList.join(" ")}>
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
    )
  );
}

SideDrawer.propTypes = {
  showSideDrawer: bool.isRequired,
  exitSideDrawer: func.isRequired,
};

export default SideDrawer;
