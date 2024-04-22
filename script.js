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
		checkCurrentTime()
	} else {
		alert("Something went wrong")
	}
})

function checkCurrentTime() {
	const date = new Date()
	const currentDayOfWeek = date.getDay()
	let askWeek = null
	while (askWeek == null || askWeek > 3) {
		askWeek = Number(prompt("Current week:", 1))
	}
	eachDay(currentDayOfWeek, askWeek)
}

const container = document.getElementById("container_table")

function eachDay(currentDay, week) {
	if (currentDay < 6 && currentDay !== 3 && currentDay !== 0) {

		let correctDayArr = null

		switch (currentDay) {
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

		let currentWeek = null

		switch (week) {
			case 1:
				currentWeek = weekArray[0][1][correctDayArr]
				break
			case 2:
				currentWeek = weekArray[1][1][correctDayArr]
				break
			case 3:
				currentWeek = weekArray[2][1][correctDayArr]
				break
		}
		displayWeek(currentWeek)
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
