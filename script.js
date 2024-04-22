"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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

let previousDayOfWeek = 0
let checkTime = setInterval(checkCurrentTime, 3600)
function checkCurrentTime() {
	date = new Date()
	currentDayOfWeek = date.getDay()
	console.log(currentDayOfWeek)
	if (previousDayOfWeek !== currentDayOfWeek) {
		previousDayOfWeek = currentDayOfWeek
		eachDay()
		console.log("eachDay is called")
	}
}

let week = 1;

const container = document.getElementById("container_table")

function eachDay() {
	if (previousDayOfWeek == 1 ||
		previousDayOfWeek == 2 ||
		previousDayOfWeek == 4 ||
		previousDayOfWeek == 5) {

		container.innerHTML = ''

		let correctDayArr = null

		switch (previousDayOfWeek) {
			case 1:
				correctDayArr = 0
				break
			case 2:
				correctDayArr = 1
				break
			case 4:
				correctDayArr = 2
				break
			case 5:
				correctDayArr = 3
				break
		}

		function globalCount() {
			if (week === 1) {

				const currentWeek = weekArray[0][1][correctDayArr]
				displayWeek(currentWeek)

			} else if (week === 2) {

				const currentWeek = weekArray[1][1][correctDayArr]
				displayWeek(currentWeek)

			} else if (week === 3) {

				const currentWeek = weekArray[2][1][correctDayArr]
				displayWeek(currentWeek)

			}

			if (previousDayOfWeek === 5) {
				week++

				if (week > 3) {
					week = 0
				}
			}
		}
		globalCount()
	} else {
		container.innerHTML = ''
	}
}

function displayWeek(weekDay) {
	for (let i = 0; i < weekDay.length; i++) {

		let newEl = null

		if (i == 0) {
			newEl = document.createElement('th')
		} else {
			newEl = document.createElement('td')
			if (i < 8) {
				newEl.style.backgroundColor = "green"
			} else {
				newEl.style.backgroundColor = "red"
			}
		}

		newEl.textContent = weekDay[i]

		if (i !== 0) {
			newEl.setAttribute('tabindex', 0)
			newEl.addEventListener('dblclick', function () {
				this.remove()
			})
		}

		container.append(newEl)

	}
}
