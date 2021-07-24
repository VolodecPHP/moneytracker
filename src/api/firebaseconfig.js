import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth' 

const firebaseConfig = {
	apiKey: "AIzaSyC65vOfi-W0PI6g7Ajz-AVrXJIIDskswxE",
	authDomain: "moneytracker-86aed.firebaseapp.com",
	projectId: "moneytracker-86aed",
	storageBucket: "moneytracker-86aed.appspot.com",
	messagingSenderId: "778313824970",
	appId: "1:778313824970:web:32509b24c21a2d848c1233"
};

// init firebase

firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()

export {
	projectAuth,
  projectFirestore,
}