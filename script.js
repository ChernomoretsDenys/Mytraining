"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const databaseLink = {
	databaseURL: "https://training-7c03e-default-rtdb.europe-west1.firebasedatabase.app/"
}

// let name = null;

// while (name !== "ann" && name !== "den") {
// 	name = prompt("Enter your name:").toLowerCase();
// }

// let databaseName = null;
const wellcomeBack = document.getElementById("container_welcomeBack");
wellcomeBack.textContent = "Wellcome back Den!"

// if (name === "den") {
// 	databaseName = "trainingDen";
// 	wellcomeBack.textContent = "Wellcome back Den!"
// } else if (name === "ann") {
// 	databaseName = "trainingAnn";
// 	wellcomeBack.textContent = "Wellcome back Ann!"
// }

const initApp = initializeApp(databaseLink);
const database = getDatabase(initApp);
const reference = ref(database, "trainingDen");

let weekArray = null;
let weekArrayLength = null;

onValue(reference, function (snapshot) {
	if (snapshot.exists()) {
		weekArray = Object.entries(snapshot.val());
		weekArrayLength = weekArray.length;
		checkCurrentTime();
	} else {
		alert("Something went wrong");
	}
})

const optionsButton = document.getElementById("optionsButton");
const navigationOpt = document.querySelector(".navigation_options");

const changeAccount = document.getElementById("change-account");
const selectSpecificDay = document.getElementById("select-specifDay");
const showProgress = document.getElementById("show-progress");
const viewOthers = document.getElementById("view-others");

optionsButton.addEventListener("click", function () {
	navigationOpt.classList.toggle("open");
	const buttonText = optionsButton.textContent;
	optionsButton.textContent = buttonText === "Options" ? "Exit" : "Options";
});


function checkCurrentTime() {
	const date = new Date();
	const currentDayOfWeek = date.getDay();
	let askWeek = null;
	while (askWeek == null || askWeek > 3) {
		askWeek = Number(prompt("Current week:", 1));
	}
	eachDay(currentDayOfWeek, askWeek);
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
				newEl.style.backgroundColor = "#08f"
			} else {
				newEl.style.backgroundColor = "#f03"
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
