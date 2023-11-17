import { element, node, oneOfType, string } from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import LayoutContext from 'src/hoc/layout/context'
import styles from './navigation-item.module.css'

function NavigationItem({ href, children }) {
	const { setDrawerVisibility } = React.useContext(LayoutContext)

	return (
		<li className={styles.navigationItem}>
			<NavLink
				onClick={(e) => setDrawerVisibility(false)}
				className={({ isActive }) => (isActive ? styles.active : '')}
				to={href}
			>
				{children}
			</NavLink>
		</li>
	)
}

NavigationItem.propTypes = {
	href: string.isRequired,
	children: oneOfType([string, element, node]).isRequired,
}

export default NavigationItem
