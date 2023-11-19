import { arrayOf, bool, shape, string } from 'prop-types'
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Order from 'src/components/order'
import Loader from 'src/components/ui/loader'
import ErrorHandler from 'src/hoc/error-handler'
import { initializeOrders } from 'src/store/features/orders/ordersSlice'
import xs from 'src/xs'
import styles from './orders.module.css'

function Orders({ orders, fetching, token }) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeOrders(token))
	}, [])

	return (
		<>
			{!fetching && !orders && (
				<p className={styles.noOrder}>You have made no orders recently</p>
			)}
			{fetching && !orders && <Loader>Getting your orders</Loader>}
			{!fetching && orders && (
				<section className={styles.ordersWrapper}>
					<h1>Your Orders</h1>
					<ul className={styles.orderList}>
						{orders.map((order) => (
							<li key={order.id}>
								<Order details={order} />
							</li>
						))}
					</ul>
				</section>
			)}
		</>
	)
}

Orders.defaultProps = { orders: null, token: null }

Orders.propTypes = {
	orders: arrayOf(shape({})),
	fetching: bool.isRequired,
	token: string,
}

const mapStateToProps = (state) => {
	const { orders, fetching } = state.orders
	const { token } = state.auth
	return { orders, fetching, token }
}

export default connect(mapStateToProps)(ErrorHandler(Orders, xs))
