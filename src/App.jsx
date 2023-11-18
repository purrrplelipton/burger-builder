import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from './components/ui/loader'
import BurgerBuilder from './containers/burger-builder'
import Layout from './hoc/layout'

const Checkout = React.lazy(() => import('./containers/checkout'))
const Orders = React.lazy(() => import('./containers/orders'))
const Auth = React.lazy(() => import('./containers/auth'))

function App() {
	return (
		<Layout>
			<React.Suspense fallback={<Loader />}>
				<Routes>
					<Route path="checkout/*" element={<Checkout />} />
					<Route path="orders/*" element={<Orders />} />
					<Route path="auth" element={<Auth />} />
					<Route path="/" element={<BurgerBuilder />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</React.Suspense>
		</Layout>
	)
}

export default App
