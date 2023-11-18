import React from 'react'
import Logo from 'src/components/logo'
import { NavigationItems } from 'src/components/navigation'
import Backdrop from 'src/components/ui/backdrop'
import LayoutContext from 'src/hoc/layout/context'
import DrawerToggle from './drawer-toggle'
import styles from './side-drawer.module.css'

function SideDrawer() {
	const { drawerVisible, setDrawerVisibility } = React.useContext(LayoutContext)
	const [visible, setVisibility] = React.useState(false)
	const [classList, setClassList] = React.useState([
		styles.sideDrawer,
		styles.slideOut,
	])

	const hideDrawer = () => {
		setDrawerVisibility(false)
	}

	React.useEffect(() => {
		if (drawerVisible) {
			setVisibility(true)
			const reveal$delay = setTimeout(
				() => setClassList((prv) => [...prv, styles.slideOut]),
				50,
			)
			return () => clearTimeout(reveal$delay)
		}
		setClassList((prv) => prv.filter((cn) => cn !== styles.slideOut))
		const removal$delay = setTimeout(() => setVisibility(false), 350)
		return () => clearTimeout(removal$delay)
	}, [drawerVisible])

	return (
		visible && (
			<>
				<Backdrop show={drawerVisible} onClick={hideDrawer} />
				<div className={classList.join(' ')}>
					<header className={styles.topSection}>
						<div className={styles.logo}>
							<Logo />
						</div>
						<DrawerToggle drawerVisible={drawerVisible} onClick={hideDrawer} />
					</header>
					<nav>
						<NavigationItems />
					</nav>
				</div>
			</>
		)
	)
}

export default SideDrawer
