import { arrayOf, bool, shape } from 'prop-types'
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Order from 'src/components/order'
import { Loader } from 'src/components/ui'
import ErrorHandler from 'src/hoc/error-handler'
import { initializeOrders } from 'src/store/features/orders/ordersSlice'
import xs from 'src/xs'
import styles from './orders.module.css'

function Orders({ orders, fetching }) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeOrders())
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

Orders.defaultProps = { orders: null }

Orders.propTypes = {
	orders: arrayOf(shape({})),
	fetching: bool.isRequired,
}

const mapStateToProps = (state) => {
	const { orders, fetching } = state.orders
	return { orders, fetching }
}

export default connect(mapStateToProps)(ErrorHandler(Orders, xs))
