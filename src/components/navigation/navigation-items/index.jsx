import React from 'react'
import NavigationItem from './navigation-item'
import { navigationItems } from './navigation-items.module.css'

function NavigationItems() {
	return (
		<ul className={navigationItems}>
			<NavigationItem href="/" active>
				<span>Burger&nbsp;Builder</span>
			</NavigationItem>
			<NavigationItem href="orders">
				<span>Orders</span>
			</NavigationItem>
			<NavigationItem href="auth">
				<span>Auth</span>
			</NavigationItem>
		</ul>
	)
}

export default NavigationItems
