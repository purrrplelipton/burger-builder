import { configureStore } from '@reduxjs/toolkit'
import contents from './features/contents/contentsSlice'
import orders from './features/orders/ordersSlice'

const store = configureStore({
	reducer: { contents, orders },
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
