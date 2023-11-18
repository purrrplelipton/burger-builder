import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth/authSlice'
import contents from './features/contents/contentsSlice'
import orders from './features/orders/ordersSlice'

const store = configureStore({
	reducer: { contents, orders, auth },
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
