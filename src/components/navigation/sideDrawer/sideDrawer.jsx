import Logo from "@components/logo";
import { NavigationItems } from "@components/navigation";
import { Backdrop } from "@components/ui";
import propTypes from "prop-types";
import React, { useEffect, useState } from "react";
import DrawerToggle from "./drawerToggle";
import {
  logo,
  sideDrawer,
  slideOut,
  topSection,
} from "./sideDrawer.module.css";

function SideDrawer({ showSideDrawer, exitSideDrawer }) {
  const [visible, setVisibility] = useState(false);
  const [classList, setClassList] = useState([sideDrawer, slideOut]);

  useEffect(() => {
    if (showSideDrawer) {
      setVisibility(true);
      const reveal$delay = setTimeout(
        () => setClassList((prv) => [...prv, slideOut]),
        100
      );
      return () => clearTimeout(reveal$delay);
    }
    setClassList((prv) => prv.filter((cn) => cn !== slideOut));
    const removal$delay = setTimeout(() => setVisibility(false), 400);
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
  showSideDrawer: propTypes.bool.isRequired,
  exitSideDrawer: propTypes.func.isRequired,
};

export default SideDrawer;
