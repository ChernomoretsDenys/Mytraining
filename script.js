"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const databaseLink = {
	databaseURL: "https://training-7c03e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const url = './trainingData.json'
async function getData(url) {
	const response = await fetch(url)

	return response.json()
}
const trainingData = Object.entries(await getData(url))

const currentDay = new Date().getDay()
console.log(currentDay)

const databaseName = trainingData[0][0]

const initApp = initializeApp(databaseLink)
const database = getDatabase(initApp)
const reference = ref(database, databaseName)

onValue(reference, function (snapshot) {
	
})


console.log(trainingData )
function populateTraining() {
	// for (let i = 0; i < trainingData.length; i++) {
		
	// }
}
populateTraining()
let week = 2

let weekInterval = setInterval(globalCount, 1000)

function globalCount() {
	if (week === 1) {
		const currentWeek = trainingData[0][1][0]
		displayWeek(currentWeek)

		console.log(`1`, trainingData[0][1][0])

	} else if (week === 2) {
		for (let day = 0; day < trainingData[0][1][1].length; day++) {

		}
		console.log(`2`, trainingData[0][1][1])
	} else if (week === 3) {
		for (let day = 0; day < trainingData[0][1][2].length; day++) {

		}
		console.log(`3`, trainingData[0][1][2])
	} else {
		console.log("restarting training", trainingData[0][1][2][0])
		week = 0
		window.clearInterval(weekInterval)
	}
	week++
}

function displayWeek(week) {
	if (currentDay === 1
		|| currentDay === 2
		|| currentDay === 4
		|| currentDay === 5) {
			
	}
	let day = setInterval(setDay, 2000)
	function setDay() {

	}
}

function renderDay() {

}

function restart() {
	week = 0
	window.clearInterval(weekInterval)
}



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