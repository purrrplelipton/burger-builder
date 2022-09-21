import React from 'react'
import propTypes from 'prop-types'

import Aux from '../../hoc/aux'
import Toolbar from '../navigation/toolbar/toolbar'

import styles from './layout.module.css'

const Layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={styles.content}>{props.children}</main>
  </Aux>
)

Layout.propTypes = { children: propTypes.object.isRequired }

export default Layout
