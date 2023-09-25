import { Toolbar } from "@components/navigation";
import { Loader } from "@components/ui";
import { element, node, oneOfType } from "prop-types";
import React, { Suspense, lazy, useState } from "react";

const SideDrawer = lazy(() =>
  import("@components/navigation/side-drawer/side-drawer")
);

const mainContentStyles = {
  width: "100%",
  minHeight: "100%",
  display: "flex",
  flexFlow: "column nowrap",
  padding: "5em 0 0",
};

function Layout({ children }) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  return (
    <>
      <Toolbar
        showSideDrawer={showSideDrawer}
        toggleSideDrawer={() => setShowSideDrawer(true)}
      />
      <Suspense fallback={<Loader />}>
        <SideDrawer
          showSideDrawer={showSideDrawer}
          exitSideDrawer={() => setShowSideDrawer(false)}
        />
      </Suspense>
      <main style={mainContentStyles}>{children}</main>
    </>
  );
}

Layout.propTypes = { children: oneOfType([node, element]).isRequired };

export default Layout;
