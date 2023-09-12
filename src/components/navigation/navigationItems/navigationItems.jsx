import React from "react";
import NavigationItem from "./navigationItem/navigationItem";
import { navigationItems } from "./navigationItems.module.css";

function NavigationItems() {
  return (
    <ul className={navigationItems}>
      <NavigationItem to="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem to="/">Checkout</NavigationItem>
    </ul>
  );
}

export default NavigationItems;
