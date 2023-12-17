import React from 'react'
import Logo from 'src/components/logo'
import { NavigationItems } from 'src/components/navigation'
import Backdrop from 'src/components/ui/backdrop'
import LayoutContext from 'src/hoc/layout/context'
import DrawerToggle from './drawer-toggle'
import styles from './side-drawer.module.css'

function SideDrawer() {
	const { drawerVisible, setDrawerVisibility } = React.useContext(LayoutContext)
	const hideDrawer = () => setDrawerVisibility(false)

	return (
		drawerVisible && (
			<>
				<Backdrop show={drawerVisible} onClick={hideDrawer} />
				<div className={styles.a}>
					<header className={styles.b}>
						<div className={styles.logo}>
							<Logo />
						</div>
						<DrawerToggle drawerVisible={drawerVisible} onClick={hideDrawer} />
					</header>
					<nav style={{ height: '100%' }}>
						<NavigationItems />
					</nav>
				</div>
			</>
		)
	)
}

export default SideDrawer
