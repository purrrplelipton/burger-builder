import React, { useState } from 'react'
import propTypes from 'prop-types'

import Auxiliary from '../auxiliary/auxiliary'
import Toolbar from '../../components/navigation/toolbar/toolbar'
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer'

import styles from './layout.module.css'

const Layout = (props) => {
  const [sideDrawer, setSideDrawer] = useState(false)

  const exitSideDrawer = () => setSideDrawer(false)

  const toggleSideDrawer = () => setSideDrawer((prevState) => !prevState)

  return (
    <Auxiliary>
      <Toolbar toggleSideDrawer={toggleSideDrawer} />
      <SideDrawer showSideDrawer={sideDrawer} exitSideDrawer={exitSideDrawer} />
      <main className={styles.content}>{props.children}</main>
    </Auxiliary>
  )
}
Layout.propTypes = { children: propTypes.object.isRequired }

export default Layout
