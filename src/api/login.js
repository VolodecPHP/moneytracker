import { projectAuth } from '../api/firebaseconfig'

let error = null

export const useLogin = () => {

	const login = async (email, password) => {
		error = null
	
		try {
			const res = await projectAuth.signInWithEmailAndPassword(email,password)
			error = null

			return res
	
		} catch (err) {
			error = err.message
		}
	}

	const getError = () => {
		return error
	}

  return { login, getError }
}
