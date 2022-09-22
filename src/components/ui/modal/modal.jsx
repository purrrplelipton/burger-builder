import React, { memo } from 'react'
import propTypes from 'prop-types'

import Auxiliary from '../../../hoc/auxiliary/auxiliary'
import Backdrop from '../backdrop/backdrop'

import styles from './modal.module.css'

const Modal = (props) => (
  <Auxiliary>
    <Backdrop showModal={props.showModal} exitModal={props.exitModal} />
    <div
      style={{
        transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.showModal ? '1' : '0',
      }}
      className={styles.modal}
    >
      {props.children}
    </div>
  </Auxiliary>
)

Modal.propTypes = {
  children: propTypes.object.isRequired,
  showModal: propTypes.bool,
  exitModal: propTypes.func.isRequired,
}

export default memo(Modal)
