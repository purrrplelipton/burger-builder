import { configureStore } from '@reduxjs/toolkit'
import auth from './features/auth'
import contents from './features/contents'
import orders from './features/orders'

const store = configureStore({
	reducer: { contents, orders, auth },
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
