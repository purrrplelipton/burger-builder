import { createSlice } from '@reduxjs/toolkit'
import xs from 'src/xs'

const purchaseSlice = createSlice({
	name: 'purchase',
	initialState: { processing: false, orders: [] },
	reducers: {
		setProcessingState: (state, action) => {
			return { ...state, processing: action.payload }
		},
		onPurchaseSuccess: (state, action) => {
			return { ...state, orders: [...state.orders, action.payload] }
		},
	},
})

export const { onPurchaseSuccess, onPurchaseFail, setProcessingState } =
	purchaseSlice.actions

export const commencePurchasing = (payload) => {
	return async (dispatch) => {
		try {
			dispatch(setProcessingState(true))
			const {
				data: { name: orderID },
			} = await xs.post('/orders.json', payload)
			dispatch(onPurchaseSuccess(orderID))
		} catch (_) {
			console.log(_.message)
		} finally {
			dispatch(setProcessingState(false))
		}
	}
}

export default purchaseSlice.reducer
