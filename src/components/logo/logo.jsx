import React from 'react'
import propTypes from 'prop-types'

import burger_logo from '../../assets/images/hamburger-512.png'
import styles from './logo.module.css'

const Logo = (props) => (
  <div className={styles.logo} style={{ height: props.height }}>
    <img src={burger_logo} alt={'burger logo'} />
  </div>
)

Logo.propTypes = { height: propTypes.string }

export default Logo
