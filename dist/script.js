import { initializeApp, getDatabase, ref, onValue } from "./firebase.js";
window.addEventListener("load", checkUser);
const databaseLink = {
    databaseURL: "https://training-7c03e-default-rtdb.europe-west1.firebasedatabase.app/"
};
let daysInWeek;
let targetDay;
let container;
let numberOfSets;
function containerProgress() {
    const tableData = document.querySelectorAll("td").length;
    if (tableData <= 0) {
        let progress = Number(localStorage.getItem("currentProgressDays"));
        progress++;
        localStorage.setItem("currentProgressDays", progress.toString());
    }
}
;
function checkUser() {
    let name = null;
    if (localStorage.getItem("userName")) {
        name = localStorage.getItem("userName");
    }
    else {
        while (name !== "ann" && name !== "den") {
            name = prompt("Enter your name").toLowerCase();
        }
        defineLocalStorage(name);
    }
    getUserDataBase(name);
}
function defineLocalStorage(userNameLocal) {
    localStorage.setItem("userName", userNameLocal);
    localStorage.setItem("currentWeek", "0");
    localStorage.setItem("currentProgressDays", "0");
    localStorage.setItem("currentProgressWeeks", "0");
}
function getUserDataBase(userName) {
    const upperCaseUser = userName.charAt(0).toUpperCase() + userName.slice(1);
    if (upperCaseUser === "Ann") {
        numberOfSets = 3;
    }
    else if (upperCaseUser === "Den") {
        numberOfSets = 4;
    }
    else {
        alert("Something went wrong!");
    }
    const databaseName = `training${upperCaseUser}`;
    const initApp = initializeApp(databaseLink);
    const database = getDatabase(initApp);
    const reference = ref(database, databaseName);
    onValue(reference, function (snapshot) {
        if (snapshot.exists()) {
            const weekArray = Object.entries(snapshot.val());
            const pEl = document.getElementById("container_welcomeBack");
            pEl.textContent = `Welcome back ${upperCaseUser}!`;
            checkCurrentTime(weekArray);
            setButtons();
        }
        else {
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
    daysInWeek = weekArray[0][1].length;
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (let i = 0; i < daysInWeek; i++) {
        const liEl = document.createElement("li");
        liEl.setAttribute("day", i.toString());
        liEl.textContent = daysOfWeek[i];
        chooseWeek.append(liEl);
    }
    ;
    chooseWeek.addEventListener("click", addChooseWeek);
    function addChooseWeek(e) {
        if (e.target.tagName === "LI") {
            targetDay = Number(e.target.getAttribute("day"));
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
                localStorage.setItem("currentWeek", "0");
            }
            else {
                week++;
                localStorage.setItem("currentWeek", `${week}`);
            }
            let currentProgressWeeks = localStorage.getItem("currentProgressWeeks");
            currentProgressWeeks++;
            localStorage.setItem("currentProgressWeeks", currentProgressWeeks);
        }
    }
}
function eachDay(week, weekArray, clickedDay) {
    const currentWeek = weekArray[week][1][clickedDay];
    const numberMatch = Number(currentWeek[0].match(/\d+/));
    if (numberMatch) {
        if (numberMatch > 40) {
            numberOfSets = 3;
        }
    }
    displayWeek(currentWeek);
}
function displayWeek(weekDay) {
    container = document.getElementById("container_table");
    if (container.querySelectorAll('td').length > 0) {
        container.textContent = "";
    }
    function checkExercise(a, b, c) {
        const p = document.querySelector(`.p-${b}`);
        p.textContent = a.toString();
        if (c) {
            p === null || p === void 0 ? void 0 : p.remove();
        }
    }
    for (let i = 0; i < weekDay.length; i++) {
        let newEl;
        if (i == 0) {
            newEl = document.createElement('th');
        }
        else {
            newEl = document.createElement('td');
            newEl.style.backgroundColor = "#08f";
        }
        newEl.textContent = weekDay[i];
        if (i > 2 && i < 9) {
            newEl.setAttribute('times', "0");
            newEl.setAttribute('class', `td-${i}`);
            newEl.setAttribute('element', `${i}`);
            newEl.addEventListener('dblclick', function () {
                const singleSet = Number(newEl.getAttribute("times")) + 1;
                const element = newEl.getAttribute('element');
                checkExercise(singleSet, element, false);
                newEl.setAttribute('times', (singleSet).toString());
                if (singleSet === numberOfSets) {
                    checkExercise(singleSet, element, true);
                    this.remove();
                }
            });
        }
        else {
            newEl.setAttribute('class', `td-${i}`);
            newEl.addEventListener('dblclick', function () {
                this.remove();
            });
        }
        container.append(newEl);
    }
    for (let i = 0; i < weekDay.length - 1; i++) {
        if (i > 2 && i < 9) {
            let el = document.createElement('p');
            el.setAttribute("class", `p-${i}`);
            el.style.backgroundColor = "#dd4e26";
            el.textContent = "0";
            container.append(el);
        }
    }
    container.addEventListener('dblclick', containerProgress);
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
    const changeCurrentDay = document.getElementById("change-currentDay");
    changeCurrentDay.addEventListener("click", changeCurrentDayFunction);
    function changeAccountFunction() {
        const askMess = confirm("Are you sure you want to change your account?");
        if (askMess) {
            localStorage.removeItem("userName");
            localStorage.removeItem("currentWeek");
            localStorage.removeItem("currentProgressDays");
            localStorage.removeItem("currentProgressWeeks");
            let newUserName = null;
            while (newUserName !== "ann" && newUserName !== "den") {
                newUserName = prompt("Enter new user name").toLowerCase();
            }
            reset(newUserName);
            defineLocalStorage(newUserName);
        }
    }
    function showProgressFunction() {
        const showProgressDays = localStorage.getItem("currentProgressDays");
        const showProgressWeeks = localStorage.getItem("currentProgressWeeks");
        alert(`You have trained ${showProgressDays} days.
You have trained ${showProgressWeeks} weeks.`);
    }
    function changeCurrentDayFunction() {
        const askMess = confirm("Are you sure you want to change current day?");
        if (askMess) {
            const userName = localStorage.getItem("userName");
            if (targetDay === daysInWeek - 1) {
                const currentWeekProgress = (Number(localStorage.getItem("currentWeek")) - 1).toString();
                const currentWeeksProgress = (Number(localStorage.getItem("currentProgressWeeks")) - 1).toString();
                localStorage.setItem("currentWeek", currentWeekProgress);
                localStorage.setItem("currentProgressWeeks", currentWeeksProgress);
            }
            reset(userName);
        }
    }
    function reset(user) {
        optionsButtonToggle();
        changeCurrentDay.removeEventListener("click", changeCurrentDayFunction);
        changeAccount.removeEventListener("click", changeAccountFunction);
        optionsButton.removeEventListener("click", optionsButtonToggle);
        showProgress.removeEventListener("click", showProgressFunction);
        getUserDataBase(user);
        container.removeEventListener('dblclick', containerProgress);
    }
}
