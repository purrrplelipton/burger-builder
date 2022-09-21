import React from 'react'
import propTypes from 'prop-types'

import Aux from '../../../hoc/aux'
import Backdrop from '../backdrop/backdrop'

import styles from './modal.module.css'

const Modal = (props) => (
  <Aux>
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
  </Aux>
)

Modal.propTypes = {
  children: propTypes.object.isRequired,
  showModal: propTypes.bool.isRequired,
  exitModal: propTypes.func.isRequired,
}

export default Modal
