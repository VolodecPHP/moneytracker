import { projectAuth } from '../api/firebaseconfig'

let error = null

export const useSignup = () => {

	const signup = async (email, password) => {
		error = null
	
		try {
			const res = await projectAuth.createUserWithEmailAndPassword(email,password)
			error = null
			return res
	
		} catch(err) {
			error = err.message
		}
	}

	const getError = () => {
		return error
	}

	return { signup, getError}
}


 