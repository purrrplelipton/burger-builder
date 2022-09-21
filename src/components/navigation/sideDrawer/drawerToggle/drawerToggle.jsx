import React from 'react'
import propTypes from 'prop-types'

import styles from './drawerToggle.module.css'

const DrawerToggle = (props) => {
  return (
    <div className={styles.drawerToggleWrapper}>
      <span onClick={props.onClick} className={styles.drawerToggle}></span>
    </div>
  )
}

DrawerToggle.propTypes = { onClick: propTypes.func }

export default DrawerToggle
