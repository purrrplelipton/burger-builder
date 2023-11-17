import React from "react";
import NavigationItem from "./navigation-item";
import { navigationItems } from "./navigation-items.module.css";

function NavigationItems() {
  return (
    <ul className={navigationItems}>
      <NavigationItem href="/" active>
        Burger&nbsp;Builder
      </NavigationItem>
      <NavigationItem href="orders">Orders</NavigationItem>
    </ul>
  );
}

export default NavigationItems;
