import { bool, element, func, node, oneOfType } from 'prop-types'
import React from 'react'
import styles from './backdrop.module.css'

function Backdrop({ show, onClick, children }) {
	return (
		show && (
			<div role="presentation" className={styles.a} onClick={onClick}>
				{children}
			</div>
		)
	)
}
Backdrop.defaultProps = { children: null }

Backdrop.propTypes = {
	children: oneOfType([node, element]),
	show: bool.isRequired,
	onClick: func.isRequired,
}

export default React.memo(Backdrop)
