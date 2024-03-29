import { bool, func, node, oneOfType, string } from 'prop-types'
import React from 'react'
import Backdrop from 'src/components/ui/backdrop'
import { modal as content } from './modal.module.css'

function Modal({ exitModal, showModal, children }) {
	return (
		<Backdrop show={showModal} onClick={exitModal}>
			<div
				role="presentation"
				onClick={(e) => e.stopPropagation()}
				className={content}
			>
				{children}
			</div>
		</Backdrop>
	)
}
Modal.defaultProps = { children: null }
Modal.propTypes = {
	children: oneOfType([string, node]),
	showModal: bool.isRequired,
	exitModal: func.isRequired,
}

export default React.memo(Modal)
