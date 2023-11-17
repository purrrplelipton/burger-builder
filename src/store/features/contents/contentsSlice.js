import { createSlice } from '@reduxjs/toolkit'
import xs from 'src/xs'

const PRICES = {
	bacon: 200,
	cheese: 100,
	lettuce: 50,
	'onion-ring': 100,
	patty: 300,
	pickles: 50,
	tomato: 50,
}

const contentsSlice = createSlice({
	name: 'contents',
	initialState: {
		contents: null,
		loading: false,
		total: 100,
	},
	reducers: {
		setLoadingState: (state, action) => {
			return { ...state, loading: action.payload }
		},
		setContents: (state, action) => {
			const newState = { ...state, contents: action.payload }
			let updatedTotal = state.total

			console.log('Before loop:', { updatedTotal })

			for (const [cn, quantity] of Object.entries(newState.contents)) {
				if (quantity > 0) {
					console.log({ cn, price: PRICES[cn], updatedTotal })

					for (let i = 0; i < quantity; i++) {
						updatedTotal += PRICES[cn]
					}

					console.log({ updatedTotal })
				}
			}

			console.log('After loop:', { updatedTotal })

			return { ...newState, total: updatedTotal }
		},
		addContent: (state, action) => {
			return {
				...state,
				contents: {
					...state.contents,
					[action.payload]: state.contents[action.payload] + 1,
				},
				total: state.total + PRICES[action.payload],
			}
		},
		removeContent: (state, action) => {
			const updatedContents = {
				...state.contents,
				[action.payload]:
					state.contents[action.payload] >= 1
						? state.contents[action.payload] - 1
						: state.contents[action.payload],
			}

			return {
				...state,
				contents: { ...updatedContents },
				total:
					state.total - PRICES[action.payload] >= 100
						? state.total - PRICES[action.payload]
						: state.total,
			}
		},
	},
})

export const { setLoadingState, setContents, addContent, removeContent } =
	contentsSlice.actions

export const fetchContents = () => async (dispatch) => {
	try {
		dispatch(setLoadingState(true))
		const { data } = await xs.get('/ingredients.json')
		dispatch(setContents(data))
	} catch (error) {
		// Handle error if needed
	} finally {
		dispatch(setLoadingState(false))
	}
}

export default contentsSlice.reducer
