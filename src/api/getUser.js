import { ref } from 'vue'
import { projectAuth } from '../api/firebaseconfig'

const user = ref(projectAuth.currentUser)

projectAuth.onAuthStateChanged(_user => {
  user.value = _user
})

const getUser = () => {
	let userFromLocalStorage = localStorage.getItem("logined-user");

	if(userFromLocalStorage) { 
		return JSON.parse(userFromLocalStorage)
	}

  return user.value
}

export default getUser