import { element, node, oneOfType } from 'prop-types'
import React from 'react'
import { Toolbar } from 'src/components/navigation'
import { Loader } from 'src/components/ui'
import LayoutContext from './context'

const SideDrawer = React.lazy(
	() => import('src/components/navigation/side-drawer'),
)

const mainContentStyles = {
	width: '100%',
	minHeight: '100%',
	display: 'flex',
	flexFlow: 'column nowrap',
	padding: '5em 0 0',
}

function Layout({ children }) {
	const [drawerVisible, setDrawerVisibility] = React.useState(false)

	return (
		<LayoutContext.Provider value={{ drawerVisible, setDrawerVisibility }}>
			<Toolbar />
			<React.Suspense fallback={<Loader />}>
				<SideDrawer />
			</React.Suspense>
			<main style={mainContentStyles}>{children}</main>
		</LayoutContext.Provider>
	)
}

Layout.propTypes = { children: oneOfType([node, element]).isRequired }

export default Layout
