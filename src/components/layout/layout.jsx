import React, { useState } from 'react'
import propTypes from 'prop-types'

import Aux from '../../hoc/aux'
import Toolbar from '../navigation/toolbar/toolbar'
import SideDrawer from '../navigation/sideDrawer/sideDrawer'

import styles from './layout.module.css'

const Layout = (props) => {
  const [sideDrawer, setSideDrawer] = useState(false)

  const exitSideDrawer = () => setSideDrawer(false)

  return (
    <Aux>
      <Toolbar />
      <SideDrawer showSideDrawer={sideDrawer} exitSideDrawer={exitSideDrawer} />
      <main className={styles.content}>{props.children}</main>
    </Aux>
  )
}
Layout.propTypes = { children: propTypes.object.isRequired }

export default Layout
