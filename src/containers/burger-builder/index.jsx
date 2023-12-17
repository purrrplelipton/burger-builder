import { bool, shape, string } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { X } from 'src/assets/vectors'
import Burger from 'src/components/burger'
import BuildControls from 'src/components/burger/build-controls'
import OrderSummary from 'src/components/burger/order-summary'
import Button from 'src/components/ui/button'
import Loader from 'src/components/ui/loader'
import Modal from 'src/components/ui/modal'
import ErrorHandler from 'src/hoc/error-handler'
import { setMessage } from 'src/store/features/auth'
import { fetchContents } from 'src/store/features/contents'
import xs from 'src/xs'

function BurgerBuilder({ contents, message }) {
	const [showSummary, setShowSummary] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchContents())
	}, [])

	const hideSummary = () => setShowSummary(false)

	return (
		<>
			{message && (
				<div
					style={{
						position: 'absolute',
						zIndex: 1,
						inset: '5.625em var(--spacing) auto var(--spacing)',
						display: 'flex',
						alignItems: 'center',
						padding: '1.125em 1.375em',
						backgroundColor: 'var(--grey-50)',
						borderRadius: 10,
					}}
				>
					<p style={{ marginRight: 'auto' }}>{message}</p>
					<Button
						variant="red"
						type="button"
						onClick={() => dispatch(setMessage(null))}
					>
						<div style={{ width: 18 }}>
							<X />
						</div>
					</Button>
				</div>
			)}
			{contents ? (
				<>
					<Modal showModal={showSummary} exitModal={hideSummary}>
						<OrderSummary cancelPurchase={hideSummary} />
					</Modal>
					<Burger />
					<BuildControls proceed={() => setShowSummary(true)} />
				</>
			) : (
				<Loader />
			)}
		</>
	)
}

BurgerBuilder.defaultProps = { contents: null, message: null }

BurgerBuilder.propTypes = {
	loading: bool.isRequired,
	contents: shape({}),
	message: string,
}

const mapStateToProps = (state) => {
	const { contents, loading } = state.contents
	const { message } = state.auth
	return { contents, loading, message }
}

export default connect(mapStateToProps)(ErrorHandler(BurgerBuilder, xs))
