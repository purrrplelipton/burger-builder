import { bool } from 'prop-types'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from './components/ui/loader'
import BurgerBuilder from './containers/burger-builder'
import Layout from './hoc/layout'
import { checkAuthState } from './store/features/auth'

const Checkout = React.lazy(() => import('./containers/checkout'))
const Orders = React.lazy(() => import('./containers/orders'))
const Auth = React.lazy(() => import('./containers/auth'))
const SignOut = React.lazy(() => import('./containers/sign-out'))

function App({ signedIn }) {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(checkAuthState())
	}, [])

	return (
		<Layout>
			<React.Suspense fallback={<Loader />}>
				<Routes>
					{signedIn && <Route path="checkout/*" element={<Checkout />} />}
					{signedIn && <Route path="orders/*" element={<Orders />} />}
					{!signedIn && <Route path="auth" element={<Auth />} />}
					<Route path="/" element={<BurgerBuilder />} />
					<Route path="*" element={<Navigate to="/" replace />} />
					{signedIn && <Route path="sign-out" element={<SignOut />} />}
				</Routes>
			</React.Suspense>
		</Layout>
	)
}

App.propTypes = { signedIn: bool.isRequired }

const mapStateToProps = (state) => ({ signedIn: Boolean(state.auth.token) })

export default connect(mapStateToProps)(App)
