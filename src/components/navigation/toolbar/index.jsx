import React from 'react'
import Logo from 'src/components/logo'
import { NavigationItems } from 'src/components/navigation'
import DrawerToggle from 'src/components/navigation/side-drawer/drawer-toggle'
import { desktopOnly, logo, toolbar } from './toolbar.module.css'

function Toolbar() {
	return (
		<header className={toolbar}>
			<div className={logo}>
				<Logo />
			</div>
			<nav className={desktopOnly}>
				<NavigationItems />
			</nav>
			<DrawerToggle />
		</header>
	)
}

export default Toolbar
