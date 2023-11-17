import { createSlice } from '@reduxjs/toolkit'
import xs from 'src/xs'

const purchaseSlice = createSlice({
	name: 'purchase',
	initialState: { fetching: false, processing: false, orders: null },
	reducers: {
		setFetching: (state, action) => {
			return { ...state, fetching: action.payload }
		},
		setProcessing: (state, action) => {
			return { ...state, processing: action.payload }
		},
		setOrders: (state, action) => {
			return { ...state, orders: action.payload }
		},
	},
})

export const { setFetching, setOrders, setProcessing } = purchaseSlice.actions

export const placeOrder = (payload) => {
	return async (dispatch) => {
		try {
			dispatch(setProcessing(true))
			await xs.post('/orders.json', payload)
		} catch (error) {
			console.log(error.message)
		} finally {
			dispatch(setProcessing(false))
		}
	}
}

export const initializeOrders = () => async (dispatch) => {
	try {
		dispatch(setFetching(true))
		const { data } = await xs.get('/orders.json')
		let orders = null
		if (data) {
			orders = []
			for (const [id, value] of Object.entries(data)) {
				orders.push({ ...value, id })
			}
		}
		dispatch(setOrders(orders))
	} catch (error) {
		console.log(error.message)
	} finally {
		dispatch(setFetching(false))
	}
}

export default purchaseSlice.reducer
