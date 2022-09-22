import React from 'react'
import propTypes from 'prop-types'

import Logo from '../../logo/logo'
import NavigationItems from '../navigationItems/navigationItems'
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle'

import styles from './toolbar.module.css'

const Toolbar = (props) => (
  <header className={styles.toolbar}>
    <DrawerToggle onClick={props.toggleSideDrawer} height={'100%'} />
    <div className={styles.logo}>
      <Logo />
    </div>
    <nav className={styles.desktopOnly}>
      <NavigationItems />
    </nav>
  </header>
)

Toolbar.propTypes = { toggleSideDrawer: propTypes.func }

export default Toolbar
