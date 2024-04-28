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
		defineLocalStorage(name);
	}
	getUserDataBase(name);
}

function defineLocalStorage(userNameLocal) {
	localStorage.setItem("userName", userNameLocal);
	localStorage.setItem("currentWeek", 0);
	localStorage.setItem("currentProgressDays", 0);
	localStorage.setItem("currentProgressWeeks", 0);
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
	let chooseWeek = document.querySelector('.choose-week');
	if (chooseWeek.querySelectorAll("li").length > 0) {
		chooseWeek.classList.remove("choosen");
		chooseWeek.textContent = "";
	}
	let week = Number(localStorage.getItem("currentWeek"));
	const weekArrayLength = weekArray.length;
	const daysInWeek = weekArray[0][1].length;
	const daysOfWeek = ["Monday", "Tuesday", "Thursday", "Friday"];
	for (let i = 0; i < daysInWeek; i++) {
		const liEl = document.createElement("li");
		liEl.setAttribute("day", i);
		liEl.textContent = daysOfWeek[i];
		chooseWeek.append(liEl);
	};
	chooseWeek.addEventListener("click", addChooseWeek);
	function addChooseWeek(e) {
		if (e.target.tagName === "LI") {
			const targetDay = Number(e.target.getAttribute("day"));
			chooseWeek.classList.add('choosen');
			eachDay(week, weekArray, targetDay);
			lastDay(targetDay);
			removeChooseWeek();
		}
	}
	function removeChooseWeek() {
		chooseWeek.removeEventListener("click", addChooseWeek);
	}
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

function eachDay(week, weekArray, clickedDay) {
	const currentWeek = weekArray[week][1][clickedDay];
	displayWeek(currentWeek);
}

function displayWeek(weekDay) {
	let container = document.getElementById("container_table");
	if (container.querySelectorAll('td').length > 0) {
		container.textContent = "";
	}
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

function setButtons() {
	const optionsButton = document.getElementById("optionsButton");
	const navigationOpt = document.querySelector(".navigation_options");
	optionsButton.addEventListener("click", optionsButtonToggle);
	function optionsButtonToggle() {
		navigationOpt.classList.toggle("open");
		const buttonText = optionsButton.textContent;
		optionsButton.textContent = buttonText === "Options" ? "Exit" : "Options";
	}
	const changeAccount = document.getElementById("change-account");
	changeAccount.addEventListener("click", changeAccountFunction);
	const showProgress = document.getElementById("show-progress");
	showProgress.addEventListener("click", showProgressFunction);

	function changeAccountFunction() {
		localStorage.removeItem("userName");
		localStorage.removeItem("currentWeek");
		localStorage.removeItem("currentProgressDays");
		localStorage.removeItem("currentProgressWeeks");
		let newUserName = null;
		while (newUserName !== "ann" && newUserName !== "den") {
			newUserName = prompt("Enter new user name").toLowerCase();
		}
		optionsButtonToggle();
		changeAccount.removeEventListener("click", changeAccountFunction);
		optionsButton.removeEventListener("click", optionsButtonToggle);
		showProgress.removeEventListener("click", showProgressFunction);
		defineLocalStorage(newUserName);
		getUserDataBase(newUserName);
	}
	function showProgressFunction() {
		const showProgressDays = localStorage.getItem("currentProgressDays");
		const showProgressWeeks = localStorage.getItem("currentProgressWeeks");
		alert(`You have trained ${showProgressDays} days.
You have trained ${showProgressWeeks} weeks.`)
	}
}