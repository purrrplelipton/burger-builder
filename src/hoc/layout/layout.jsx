import { SideDrawer, Toolbar } from "@components/navigation";
import pt from "prop-types";
import React, { useState } from "react";

const mainContentStyles = {
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexFlow: "column nowrap",
  paddingBlockStart: 80,
};

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
      <main style={mainContentStyles}>{children}</main>
    </>
  );
}

Layout.propTypes = { children: pt.node.isRequired };

export default Layout;
