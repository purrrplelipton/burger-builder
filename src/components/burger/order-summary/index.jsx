import { bool, func, number, shape, string } from 'prop-types'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Login2 } from 'src/assets/vectors'
import Button from 'src/components/ui/button'
import { setMessage, setReroutePath } from 'src/store/features/auth'
import { v4 as uuidv4 } from 'uuid'

function OrderSummary({ cancelPurchase, contents, total, signedIn, message }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const contentSummary = Object.keys(contents).map((type) => {
		if (contents[type] > 0) {
			return (
				<li
					key={uuidv4()}
					style={{
						display: 'flex',
						flexFlow: 'row nowrap',
						alignItems: 'center',
						gap: 14,
					}}
				>
					<p style={{ textTransform: 'capitalize' }}>{type}</p>
					:&zwnj;
					<p>{contents[type]}</p>
				</li>
			)
		}
	})

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
						backgroundColor: '#fff',
						borderRadius: 10,
					}}
				>
					<p style={{ marginRight: 'auto' }}>{message}</p>
					<Button
						type="button"
						variant="amber"
						onClick={() => {
							dispatch(setMessage(null))
							navigate('/auth', { replace: true })
							dispatch(setReroutePath('/checkout'))
						}}
					>
						<div style={{ width: 18 }}>
							<Login2 />
						</div>
					</Button>
				</div>
			)}
			<h3>Your Order</h3>
			<p>A burger with the following contents:</p>
			<ul style={{ paddingLeft: '1.25em' }}>{contentSummary}</ul>
			<p>
				Total&nbsp;~&nbsp;₦
				<strong>{total}</strong>
			</p>
			<p>Checkout?</p>
			<fieldset
				style={{
					border: 'unset',
					margin: '0.875em 0 0.375em',
					display: 'flex',
					flexFlow: 'row nowrap',
					alignItems: 'center',
					gap: '0.875em',
				}}
			>
				<Button variant="blue-grey" onClick={cancelPurchase}>
					CANCEL
				</Button>
				<Button
					variant="light-green"
					onClick={() => {
						if (signedIn) {
							return navigate('/checkout')
						}
						dispatch(setMessage('Sign in to continue.'))
						setTimeout(() => dispatch(setMessage(null)), 5000)
					}}
				>
					CONTINUE
				</Button>
			</fieldset>
		</>
	)
}

OrderSummary.propTypes = {
	cancelPurchase: func.isRequired,
	contents: shape({
		lettuce: number.isRequired,
		bacon: number.isRequired,
		cheese: number.isRequired,
		tomato: number.isRequired,
		'onion-ring': number.isRequired,
		patty: number.isRequired,
		pickles: number.isRequired,
	}).isRequired,
	total: number.isRequired,
	signedIn: bool.isRequired,
	message: string,
}

const mapStateToProps = (state) => {
	const { contents, total } = state.contents
	const { token, message } = state.auth
	return { contents, total, signedIn: Boolean(token), message }
}

export default connect(mapStateToProps)(OrderSummary)
