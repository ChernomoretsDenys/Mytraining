"use strict"

fetch('./trainingData.json')
	.then((response) => response.json())
	.then((json) => console.log(json))

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const databaseLink = {
	databaseURL: "https://training-7c03e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const databaseName = "training"

const initApp = initializeApp(databaseLink)
const database = getDatabase(initApp)
const reference = ref(database, databaseName)



const container = document.getElementById("container")


const currentDay = new Date().getDay()

console.log(currentDay)

