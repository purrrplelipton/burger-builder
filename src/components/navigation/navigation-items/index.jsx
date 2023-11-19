import React from 'react'
import LayoutContext from 'src/hoc/layout/context'
import { v4 as uuidv4 } from 'uuid'
import NavigationItem from './navigation-item'
import { navigationItems } from './navigation-items.module.css'

function NavigationItems() {
	const { signedIn } = React.useContext(LayoutContext)

	const navItems = [
		{
			href: '/',
			label: 'Burger Builder',
		},
		signedIn && {
			href: '/orders',
			label: 'Orders',
		},
		{
			href: signedIn ? '/sign-out' : '/auth',
			label: signedIn ? 'Sign Out' : 'Auth',
		},
	].filter(Boolean)

	return (
		<ul className={navigationItems}>
			{navItems.map((route) => (
				<NavigationItem key={uuidv4()} href={route.href}>
					{route.label}
				</NavigationItem>
			))}
		</ul>
	)
}

export default NavigationItems
