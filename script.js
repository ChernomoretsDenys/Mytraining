"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const databaseLink = {
	databaseURL: "https://training-7c03e-default-rtdb.europe-west1.firebasedatabase.app/"
}
const databaseName = "training"
const initApp = initializeApp(databaseLink)
const database = getDatabase(initApp)
const reference = ref(database, databaseName)

let weekArray = null
onValue(reference, function (snapshot) {
	if (snapshot.exists()) {
		weekArray = Object.entries(snapshot.val())
	} else {
		alert("Something went wrong")
	}
})

let date = null
let currentDayOfWeek = null
let currentDayOfMonth = null

let previousDayOfWeek = new Date().getDay()

let checkTime = setInterval(checkCurrentTime, 3000)
function checkCurrentTime() {
	date = new Date()
	currentDayOfWeek = date.getDay()
	currentDayOfMonth = date.getDate()
	console.log(currentDayOfWeek)
	if (previousDayOfWeek !== currentDayOfWeek) {
		previousDayOfWeek = currentDayOfWeek
	}
}
console.log( currentDayOfWeek == 6)
let week = 1

if (currentDayOfWeek === 6) {
	
	let weekInterval = setInterval(globalCount, 1000)
	function globalCount() {
		if (week === 1) {
			const currentWeek = weekArray[0][1]
			displayWeek(currentWeek)

			console.log(weekArray, currentWeek)
		}
		//else if (week === 2) {
		// 	const currentWeek = weekArray[0]
		// 	for (let day = 0; day < trainingData[0][1][1].length; day++) {

		// 	}
		// 	console.log(`2`, trainingData[0][1][1])
		// } else if (week === 3) {
		// 	for (let day = 0; day < trainingData[0][1][2].length; day++) {

		// 	}
		// 	console.log(`3`, trainingData[0][1][2])
		// } else {
		// 	console.log("restarting training", trainingData[0][1][2][0])
		// 	week = 0
		// 	window.clearInterval(weekInterval)
		// }
		// week++
	}
}


function displayWeek(weekDay) {

	// let day = setInterval(setDay, 2000)
	// function setDay() {

	// }
}

// function renderDay() {

// }

// function restart() {
// 	week = 0
// 	window.clearInterval(weekInterval)
// }



// function addLi() {
// 	for (let i = 0; i < 2; i++) {

// 	}
// }


// const container = document.getElementById("container")














// fetch('./trainingData.json')
// 	.then((response) => response.json())
// 	.then(function (json) {
// 		trainingData = Object.entries(json)
// 		console.log(json)
// 		return trainingData
// 	})


// const url = './trainingData.json'
// async function getData(url) {
// 	const response = await fetch(url)

// 	return response.json()
// }
// const trainingData = Object.entries(await getData(url))