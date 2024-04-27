"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const databaseLink = {
	databaseURL: "https://training-7c03e-default-rtdb.europe-west1.firebasedatabase.app/"
}

checkUser();
function checkUser() {
	let name = null;
	if (localStorage.getItem("userName")) {
		name = localStorage.getItem("userName");
	} else {
		while (name !== "ann" && name !== "den") {
			name = prompt("Enter your name").toLowerCase();
		}
		localStorage.setItem("userName", name);
		localStorage.setItem("currentWeek", 0);
		localStorage.setItem("currentProgressDays", 0);
		localStorage.setItem("currentProgressWeeks", 0);
	}
	getUserDataBase(name);
}

function getUserDataBase(userName) {
	const upperCaseUser = userName.charAt(0).toUpperCase() + userName.slice(1);
	const databaseName = `training${upperCaseUser}`;
	const initApp = initializeApp(databaseLink);
	const database = getDatabase(initApp);
	const reference = ref(database, databaseName);
	onValue(reference, function (snapshot) {
		if (snapshot.exists()) {
			const weekArray = Object.entries(snapshot.val());
			document.getElementById("container_welcomeBack").textContent
				= `Wellcome back ${upperCaseUser}!`;
			checkCurrentTime(weekArray);
			setButtons();
		} else {
			alert("Something went wrong! Please try again.");
		}
	});
}

function checkCurrentTime(weekArray) {
	const date = new Date();
	const currentDayOfWeek = date.getDay();

	let week = Number(localStorage.getItem("currentWeek"));
	console.log(week)

	const weekArrayLength = weekArray.length;
	const daysInWeek = weekArray[0][1].length;
	const chooseWeek = document.querySelector('.choose-week');
	const daysOfWeek = ["Monday", "Tuesday", "Thursday", "Friday"];
	console.log(weekArray.length)
	let clickedDay = null;

	for (let i = 0; i < daysInWeek; i++) {
		const liEl = document.createElement("li");
		liEl.addEventListener("click", function () {
			chooseWeek.classList.add('choosen');
			clickedDay = i;
			console.log(clickedDay);
			eachDay(currentDayOfWeek, week, weekArray, weekArrayLength, daysInWeek, clickedDay);
			lastDay(i);
		});
		liEl.textContent = daysOfWeek[i];
		chooseWeek.appendChild(liEl);
	};

	function lastDay(day) {
		if (day === daysInWeek - 1) {
			if (week === weekArrayLength - 1) {
				localStorage.setItem("currentWeek", 0);
			} else {
				week++;
				localStorage.setItem("currentWeek", week);
			}
			let currentProgressWeeks = localStorage.getItem("currentProgressWeeks");
			currentProgressWeeks++;
			localStorage.setItem("currentProgressWeeks", currentProgressWeeks);
		}
	}

}

function setButtons() {
	const optionsButton = document.getElementById("optionsButton");
	const navigationOpt = document.querySelector(".navigation_options");
	optionsButton.addEventListener("click", function () {
		navigationOpt.classList.toggle("open");
		const buttonText = optionsButton.textContent;
		optionsButton.textContent = buttonText === "Options" ? "Exit" : "Options";
	});

	const changeAccount = document.getElementById("change-account");
	changeAccount.addEventListener("click", changeAccountFunction);

	const showProgress = document.getElementById("show-progress");
	showProgress.addEventListener("click", showProgressFunction());

	function changeAccountFunction() {
		localStorage.removeItem('userName');
		localStorage.removeItem("currentProgressDays");
		let newUserName = null;
		while (newUserName !== "ann" && newUserName !== "den") {
			newUserName = prompt("Enter new user name").toLowerCase();
		}
		localStorage.setItem("userName", newUserName);
		localStorage.setItem("currentProgressDays", 0);
		getUserDataBase(newUserName);
	}

	function showProgressFunction() {
		localStorage.getItem("currentProgressDays");

	}
}

const container = document.getElementById("container_table");

function eachDay(currentDay, week, weekArray, weekArrayLength, days, clickedDay) {
	let currentWeek = null;
	if (week < weekArrayLength) {
		currentWeek = weekArray[week][1][clickedDay];
	}
	console.log(currentWeek);
	displayWeek(currentWeek)
}

function displayWeek(weekDay) {
	for (let i = 0; i < weekDay.length; i++) {
		let newEl = null;
		if (i == 0) {
			newEl = document.createElement('th');
		} else {
			newEl = document.createElement('td');
			if (i < 8) {
				newEl.style.backgroundColor = "#08f";
			} else {
				newEl.style.backgroundColor = "#f03";
			}
		}
		newEl.textContent = weekDay[i];
		if (i !== 0) {
			newEl.setAttribute('tabindex', 0);
			newEl.addEventListener('dblclick', function () {
				this.remove();
			});
		}
		container.append(newEl);
	}
	container.addEventListener('dblclick', function () {
		const tableData = document.querySelectorAll("td").length;
		if (tableData <= 0) {
			let progress = localStorage.getItem("currentProgressDays");
			progress++;
			localStorage.setItem("currentProgressDays", progress);
		}
	});
}