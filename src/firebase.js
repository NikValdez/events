import firebase from "firebase/app"
import "firebase/database"

var firebaseConfig = {
	apiKey: "AIzaSyBJQtqPG54lNKAafjZ4w33WB7cwxeUhJE4",
	authDomain: "makeshiftevents-40c43.firebaseapp.com",
	databaseURL: "https://makeshiftevents-40c43-default-rtdb.firebaseio.com",
	projectId: "makeshiftevents-40c43",
	storageBucket: "makeshiftevents-40c43.appspot.com",
	messagingSenderId: "89261877213",
	appId: "1:89261877213:web:39ba8bc4079840a678b834"
}

firebase.initializeApp(firebaseConfig)
export const databaseRef = firebase.database().ref()
export const eventsRef = databaseRef.child("events")
export default firebase
