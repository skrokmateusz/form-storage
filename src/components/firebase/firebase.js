// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBvUfhThtHfwtctbEYu3yf1JRbNY4g4cWo',
	authDomain: 'form-17894.firebaseapp.com',
	databaseURL: 'https://form-17894-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'form-17894',
	storageBucket: 'form-17894.appspot.com',
	messagingSenderId: '712607197050',
	appId: '1:712607197050:web:6bf429c315de8373da58c3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)