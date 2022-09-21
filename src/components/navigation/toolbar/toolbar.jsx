import React from 'react'
import propTypes from 'prop-types'

import styles from './toolbar.module.css'

const Toolbar = (props) => (
  <header className={styles.toolbar}>
    <div>MENU</div>
    <div>LOGO</div>
    <nav>...</nav>
  </header>
)

Toolbar.propTypes = { something: propTypes.any.isRequired }

export default Toolbar
