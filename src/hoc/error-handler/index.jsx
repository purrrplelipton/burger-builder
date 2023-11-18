import React from 'react'
import Modal from 'src/components/ui/modal'

function ErrorHandler(Wrapper, axios) {
	return function (props) {
		const [exception, setException] = React.useState(null)

		const dismissError = () => setException(null)

		const requestInterceptor = axios.interceptors.request.use((request) => {
			setException(null)
			return request
		})

		const responseInterceptor = axios.interceptors.response.use(
			(response) => response,
			(error) => {
				setException(error)
				return Promise.reject(error)
			},
		)

		React.useEffect(
			() => () => {
				axios.interceptors.request.eject(requestInterceptor)
				axios.interceptors.response.eject(responseInterceptor)
			},
			[requestInterceptor, responseInterceptor],
		)

		return (
			<>
				{exception && (
					<Modal showModal={Boolean(exception)} exitModal={dismissError}>
						{exception.message}
					</Modal>
				)}
				<Wrapper {...props} />
			</>
		)
	}
}

export default ErrorHandler
