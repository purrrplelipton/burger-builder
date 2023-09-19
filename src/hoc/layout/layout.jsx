import { Toolbar } from "@components/navigation";
import { Loader } from "@components/ui";
import pt from "prop-types";
import React, { Suspense, lazy, useState } from "react";

const SideDrawer = lazy(() =>
  import("@components/navigation/side-drawer/side-drawer")
);

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

Layout.propTypes = { children: pt.element.isRequired };

export default Layout;
