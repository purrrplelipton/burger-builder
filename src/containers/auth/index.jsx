import { bool, string } from 'prop-types'
import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/ui/button'
import Input from 'src/components/ui/input'
import Loader from 'src/components/ui/loader'
import { changeHandler, objectMapper, valuesMapper } from 'src/components/utils'
import ErrorHandler from 'src/hoc/error-handler'
import { authenticate, setReroutePath } from 'src/store/features/auth'
import xs from 'src/xs'
import styles from './auth.module.css'

const attr = {
	email: {
		type: 'email',
		placeholder: 'Email',
		value: '',
		rules: {
			required: true,
			minLength: 6,
			maxLength: 256,
			exp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		},
		valid: false,
	},
	password: {
		type: 'password',
		placeholder: 'Password',
		value: '',
		rules: {
			required: true,
			minLength: 8,
			exp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
			// exp: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
		},
		valid: false,
	},
}

function Auth({ verifying, message, error, signedIn, reroutePath, modified }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [credentials, setCredentials] = React.useState(attr)
	const [submittable, setSubmittable] = React.useState(false)
	const [mode, setMode] = React.useState('sign-in')

	const doSubmit = async (e) => {
		e.preventDefault()
		if (!submittable) return

		const details = objectMapper(credentials, 'value')
		dispatch(authenticate(details, mode))
		setCredentials(attr)
	}

	React.useEffect(() => {
		const validities = objectMapper(credentials, 'valid')
		const validitiesArray = valuesMapper(validities)
		setSubmittable(validitiesArray.every((validity) => validity === true))
	}, [credentials])

	React.useEffect(() => {
		if (signedIn) {
			navigate(reroutePath, { replace: true })
		}
	}, [signedIn])

	React.useEffect(() => {
		if (!modified && reroutePath !== '/') {
			dispatch(setReroutePath('/'))
		}
	}, [modified, reroutePath])

	return (
		<>
			{!verifying && !error && message && (
				<div className={styles.messageWrapper}>
					<p>{message}</p>
				</div>
			)}
			<div className={styles.wrapper}>
				{!verifying && error && (
					<div className={styles.errorWrapper}>
						<p>{error}</p>
					</div>
				)}
				<h1>{mode === 'sign-in' ? 'Welcome back!' : 'Create an account.'}</h1>
				<form onSubmit={doSubmit}>
					<Input
						id="email-address"
						variant="field"
						attributes={credentials.email}
						onChange={(event) => {
							changeHandler(['email'], setCredentials, event.target.value)
						}}
					/>
					<Input
						id="password"
						variant="field"
						attributes={credentials.password}
						onChange={(event) => {
							changeHandler(['password'], setCredentials, event.target.value)
						}}
					/>
					<Button type="submit" variant="light-green" disabled={!submittable}>
						<span>Sign {mode === 'sign-up' ? 'Up' : 'In'}</span>
					</Button>
				</form>
				<p>
					{mode === 'sign-in' ? "Dont'" : 'Already'} have an account?&nbsp;
					<Button
						onClick={() =>
							setMode((prv) => (prv === 'sign-in' ? 'sign-up' : 'sign-in'))
						}
						type="button"
						variant="deep-orange"
						disabled={false}
					>
						<span>Sign {mode === 'sign-in' ? 'Up' : 'In'}</span>
					</Button>
				</p>
				{verifying && !error && (
					<i className={styles.loaderWrapper}>
						<Loader>Hang tight while we verify you.</Loader>
					</i>
				)}
			</div>
		</>
	)
}

Auth.defaultProps = { message: null, error: null }

Auth.propTypes = {
	verifying: bool.isRequired,
	message: string,
	error: string,
	signedIn: bool.isRequired,
	reroutePath: string.isRequired,
	modified: bool.isRequired,
}

const mapStateToProps = (state) => {
	const { modified } = state.contents
	const { verifying, error, message, token, reroutePath } = state.auth
	return {
		verifying,
		error,
		message,
		signedIn: Boolean(token),
		reroutePath,
		modified,
	}
}

export default connect(mapStateToProps)(ErrorHandler(React.memo(Auth), xs))
