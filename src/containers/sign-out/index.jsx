import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'src/store/features/auth/authSlice'

function SignOut() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	React.useEffect(() => {
		dispatch(signOut())
		navigate('/auth', { replace: true })
	})
}

export default React.memo(SignOut)
