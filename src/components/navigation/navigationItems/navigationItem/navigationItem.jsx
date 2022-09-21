import React from 'react'
import propTypes from 'prop-types'

import styles from './navigationItem.module.css'

const NavigationItem = (props) => (
  <li className={styles.navigationItem}>
    <a className={props.active ? styles.active : null} href={props.destination}>
      {props.children}
    </a>
  </li>
)

NavigationItem.propTypes = {
  active: propTypes.bool,
  destination: propTypes.string.isRequired,
  children: propTypes.string.isRequired,
}

export default NavigationItem
