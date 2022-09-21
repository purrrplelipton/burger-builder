import React from 'react'
import propTypes from 'prop-types'

import styles from './buildControl.module.css'

const BuildControl = (props) => (
  <div className={styles.buildControl}>
    <div className={styles.label}>{props.label}</div>
    <button
      className={styles.remove}
      onClick={props.remove}
      disabled={props.disabled}
    >
      Remove
    </button>
    <button className={styles.add} onClick={props.add}>
      Add
    </button>
  </div>
)

BuildControl.propTypes = {
  label: propTypes.string.isRequired,
  remove: propTypes.func.isRequired,
  add: propTypes.func.isRequired,
  disabled: propTypes.bool.isRequired,
}

export default BuildControl
