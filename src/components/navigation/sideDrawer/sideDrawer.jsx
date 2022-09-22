import React from 'react'
import propTypes from 'prop-types'

import Logo from '../../logo/logo'
import NavigationItems from '../navigationItems/navigationItems'
import Aux from '../../../hoc/auxiliary/auxiliary'
import Backdrop from '../../ui/backdrop/backdrop'
import DrawerToggle from './drawerToggle/drawerToggle'

import styles from './sideDrawer.module.css'

const SideDrawer = (props) => {
  const stylesAttached = [styles.sideDrawer, styles.closed]
  props.showSideDrawer ? stylesAttached.pop() : null

  return (
    <Aux>
      <Backdrop
        showModal={props.showSideDrawer}
        exitModal={props.exitSideDrawer}
      />
      <div className={stylesAttached.join(' ')}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <DrawerToggle
          height={'48px'}
          sideDrawerState={props.showSideDrawer}
          onClick={props.exitSideDrawer}
        />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  )
}

SideDrawer.propTypes = {
  showSideDrawer: propTypes.bool,
  exitSideDrawer: propTypes.func.isRequired,
}

export default SideDrawer
