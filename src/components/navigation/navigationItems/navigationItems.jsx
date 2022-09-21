import React from 'react'

import NavigationItem from './navigationItem/navigationItem'

import styles from './navigationItems.module.css'

const NavigationItems = () => (
  <ul className={styles.navigationItems}>
    <NavigationItem destination={'/'} active>
      Burger Builder
    </NavigationItem>
    <NavigationItem destination={'/'}>Checkout</NavigationItem>
  </ul>
)

export default NavigationItems
