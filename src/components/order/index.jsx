import { number, oneOfType, shape, string } from 'prop-types'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './order.module.css'

function Order({ details }) {
	const { content, id } = details

	const contentList = (
		<div className={styles.contentsWrapper} key={id}>
			{Object.entries(content)
				.filter(([_, amount]) => _ !== 'total' && amount !== 0)
				.map(([name, amount]) => (
					<span key={uuidv4()}>
						{name}({amount})
					</span>
				))}
		</div>
	)

	return (
		<div className={styles.order}>
			<h2>Contents</h2>
			{contentList}
			<p className={styles.orderTotal}>
				Total:&nbsp;₦
				<strong>{content.total}</strong>
			</p>
		</div>
	)
}

Order.propTypes = {
	details: shape({
		content: shape({
			lettuce: number.isRequired,
			bacon: number.isRequired,
			cheese: number.isRequired,
			tomato: number.isRequired,
			'onion-ring': number.isRequired,
			patty: number.isRequired,
			pickles: number.isRequired,
			total: number.isRequired,
		}).isRequired,
		name: string.isRequired,
		email: string.isRequired,
		address: shape({
			street: string,
			'zip-code': oneOfType([string, number]).isRequired,
		}).isRequired,
		id: string.isRequired,
	}).isRequired,
}

export default Order
