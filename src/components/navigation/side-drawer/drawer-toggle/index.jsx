import React from 'react'
import LayoutContext from 'src/hoc/layout/context'
import styles from './drawer-toggle.module.css'
import {
	LayoutSidebarRightCollapseFilled,
	LayoutSidebarRightExpandFilled,
} from 'src/assets/vectors'

function DrawerToggle() {
	const { drawerVisible, setDrawerVisibility } = React.useContext(LayoutContext)

	return (
		<button
			type="button"
			className={styles.a}
			onClick={() => setDrawerVisibility((prvState) => !prvState)}
			aria-label={`${drawerVisible ? 'hide' : 'show'} side drawer`}
		>
			{drawerVisible ? (
				<LayoutSidebarRightCollapseFilled />
			) : (
				<LayoutSidebarRightExpandFilled />
			)}
		</button>
	)
}

export default DrawerToggle
