import { SideDrawer, Toolbar } from "@components/navigation";
import propTypes from "prop-types";
import React, { useState } from "react";
import { content } from "./layout.module.css";

function Layout({ children }) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  return (
    <>
      <Toolbar
        showSideDrawer={showSideDrawer}
        toggleSideDrawer={() => setShowSideDrawer(true)}
      />
      <SideDrawer
        showSideDrawer={showSideDrawer}
        exitSideDrawer={() => setShowSideDrawer(false)}
      />
      <main className={content}>{children}</main>
    </>
  );
}

Layout.propTypes = { children: propTypes.node.isRequired };

export default Layout;
