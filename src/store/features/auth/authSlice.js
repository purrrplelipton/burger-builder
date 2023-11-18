import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		verifying: false,
		token: null,
		userID: null,
		message: null,
		error: null,
	},
	reducers: {
		setVerifyingState: (state, action) => {
			return { ...state, verifying: action.payload }
		},
		setToken: (state, action) => {
			return { ...state, token: action.payload }
		},
		setUserID: (state, action) => {
			return { ...state, userID: action.payload }
		},
		setMessage: (state, action) => {
			return { ...state, message: action.payload }
		},
		setError: (state, action) => {
			return { ...state, error: action.payload }
		},
		signOut: (state) => {
			return { ...state, token: null, userID: null }
		},
	},
})

export const {
	setVerifyingState,
	setToken,
	setUserID,
	setError,
	setMessage,
	signOut,
} = authSlice.actions

function autoSignOut(timeout) {
	return (dispatch) => {
		setTimeout(() => dispatch(signOut()), parseInt(timeout) * 1000)
	}
}

export function authenticate(credentials, mode) {
	return async (dispatch, getState) => {
		try {
			dispatch(setVerifyingState(true))
			const { data } = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:${
					mode === 'sign-up' ? 'signUp' : 'signInWithPassword'
				}?key=${import.meta.env.VITE_SEKRET}`,
				{ ...credentials, returnSecureToken: true },
			)
			if (mode === 'sign-up') {
				dispatch(setMessage('Account creation successful.'))
				setTimeout(() => dispatch(setMessage(null)), 5000)
			} else if (mode === 'sign-in') {
				dispatch(setMessage('You are now signed in.'))
				setTimeout(() => dispatch(setMessage(null)), 5000)
			}
			const { idToken, localId, expiresIn } = data
			dispatch(setToken(idToken))
			dispatch(setUserID(localId))
			dispatch(autoSignOut(expiresIn))
		} catch (error) {
			const {
				message: errorInfo,
				response: {
					data: {
						error: { message },
					},
				},
			} = error
			if (message) {
				dispatch(setError(message))
			} else dispatch(setError(errorInfo))
		} finally {
			dispatch(setVerifyingState(false))
			const { auth } = getState()
			if (auth.error) {
				setTimeout(() => dispatch(setError(null)), 5000)
			}
		}
	}
}

export default authSlice.reducer
