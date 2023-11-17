import React from 'react'
import LayoutContext from 'src/hoc/layout/context'
import { bar, drawerToggle, open } from './drawer-toggle.module.css'

function DrawerToggle() {
	const { drawerVisible, setDrawerVisibility } = React.useContext(LayoutContext)

	const toggleDrawerVisibility = () => {
		setDrawerVisibility((prevState) => !prevState)
	}

	return (
		<button
			type="button"
			className={`${drawerToggle} ${drawerVisible ? open : ''}`}
			onClick={toggleDrawerVisibility}
			title={drawerVisible ? 'Close side drawer' : 'Open side drawer'}
		>
			<span className={bar} />
		</button>
	)
}

export default DrawerToggle
