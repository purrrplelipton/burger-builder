import { bool, shape } from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { BuildControls, Burger, OrderSummary } from 'src/components/burger'
import { Loader, Modal } from 'src/components/ui'
import ErrorHandler from 'src/hoc/error-handler'
import { fetchContents } from 'src/store/features/contents/contentsSlice'
import xs from 'src/xs'

function BurgerBuilder({ contents }) {
	const [showSummary, setShowSummary] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchContents())
	}, [])

	const hideSummary = () => setShowSummary(false)

	return contents ? (
		<>
			<Modal showModal={showSummary} exitModal={hideSummary}>
				<OrderSummary cancelPurchase={hideSummary} />
			</Modal>
			<Burger />
			<BuildControls proceed={() => setShowSummary(true)} />
		</>
	) : (
		<Loader />
	)
}

BurgerBuilder.defaultProps = { contents: null }

BurgerBuilder.propTypes = {
	loading: bool.isRequired,
	contents: shape({}),
}

const mapStateToProps = (state) => {
	const { contents, loading } = state.contents
	return { contents, loading }
}

export default connect(mapStateToProps)(ErrorHandler(BurgerBuilder, xs))
