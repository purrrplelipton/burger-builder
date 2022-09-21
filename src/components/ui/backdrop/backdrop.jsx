import React from 'react'
import propTypes from 'prop-types'

import styles from './backdrop.module.css'

const Backdrop = (props) =>
  props.showModal ? (
    <div className={styles.backDrop} onClick={props.exitModal}></div>
  ) : null

Backdrop.propTypes = {
  showModal: propTypes.bool.isRequired,
  exitModal: propTypes.func.isRequired,
}

export default Backdrop
