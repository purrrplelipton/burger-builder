import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const authSlice = createSlice({
	name: 'auth',
	initialState: { verifying: false, token: null, userID: null, error: null },
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
		setError: (state, action) => {
			return { ...state, error: action.payload }
		},
		signOut: (state) => {
			return { ...state, token: null, userID: null }
		},
	},
})

export const { setVerifyingState, setToken, setUserID, setError, signOut } =
	authSlice.actions

function expirationTimeout(timeout) {
	return (dispatch) => {
		setTimeout(() => dispatch(signOut()), timeout * 1000)
	}
}

export function authenticate(credentals, mode) {
	return async (dispatch, getState) => {
		try {
			dispatch(setVerifyingState(true))
			const { data } = await axios.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:${
					mode === 'sign-up' ? 'signUp' : 'signInWithPassword'
				}?key=${import.meta.env.VITE_SEKRET}`,
				{ ...credentals, returnSecuretoken: true },
			)
			const { idToken, localId, expiresIn } = data
			dispatch(setToken(idToken))
			dispatch(setUserID(localId))
			dispatch(expirationTimeout(expiresIn))
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
			const {
				auth: { error },
			} = getState()
			if (error) {
				setTimeout(() => {
					dispatch(setError(null))
				}, 4000)
			}
		}
	}
}

export default authSlice.reducer
