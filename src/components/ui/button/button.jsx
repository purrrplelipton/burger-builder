import React from 'react'
import propTypes from 'prop-types'

import styles from './button.module.css'

const Button = (props) => (
  <button
    className={[styles.button, styles[props.btnType]].join(' ')}
    onClick={props.onClick}
  >
    {props.children}
  </button>
)

Button.propTypes = {
  children: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  btnType: propTypes.string.isRequired,
}

export default Button
