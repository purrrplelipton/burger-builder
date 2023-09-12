import { SideDrawer, Toolbar } from "@c/navigation";
import propTypes from "prop-types";
import React, { useState } from "react";
import { content } from "./layout.module.css";

function Layout({ children }) {
  const [sideDrawer, setSideDrawer] = useState(false);

  return (
    <>
      <Toolbar toggleSideDrawer={() => setSideDrawer(true)} />
      <SideDrawer
        showSideDrawer={sideDrawer}
        exitSideDrawer={() => setSideDrawer(false)}
      />
      <main className={content}>{children}</main>
    </>
  );
}

Layout.propTypes = { children: propTypes.node.isRequired };

export default Layout;
