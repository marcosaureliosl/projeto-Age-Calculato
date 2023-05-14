const submit = document.querySelector(".arrow");

const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

const resultDays = document.querySelector(".days");
const resultMonths = document.querySelector(".months");
const resultYears = document.querySelector(".years");

const dayError = document.querySelector(".dayError");
const monthError = document.querySelector(".monthError");
const yearError = document.querySelector(".yearError");

const labelDay = document.querySelector(".labelDay");
const labelMonth = document.querySelector(".labelMonth");
const labelYear = document.querySelector(".labelYear");

const date = new Date();
let dayActual = date.getDate();
let monthActual = date.getMonth() + 1;
let yearActual = date.getFullYear();

let resultLock = false;

submit.addEventListener("click", function () {
  validation();
  if (resultLock == false) {
    calculate();
  }
});

function calculate() {
  let yearCalc = yearActual - inputYear.value - 1;
  let monthCalc = 11 - inputMonth.value + monthActual;
  if (monthCalc >= 12) {
    monthCalc -= 12;
    yearCalc++;
  }
  let dayCalc = 31 - inputDay.value + dayActual;
  if (dayCalc >= 31) {
    dayCalc -= 31;
    monthCalc++;
  }
  animation(yearCalc, monthCalc, dayCalc);
}

function validation() {
  let dayLock;
  let monthLock;
  let yearLock;
  let daysExcess = 0;

  if (
    inputMonth.value == 4 ||
    inputMonth.value == 6 ||
    inputMonth.value == 9 ||
    inputMonth == 11
  ) {
    daysExcess = 1;
  } else if (inputMonth.value == 2) {
    daysExcess = 3;
  } else {
    daysExcess = 0;
  }

  // check days
  if (inputDay.value == "") {
    dayError.style.visibility = "visible";
    dayError.innerHTML = "This field is required";
    inputDay.style.border = "1px solid var(--Light-red)";
    labelDay.style.color = "var(--Light-red)";
    dayLock = true;
  } else if (
    inputDay.value > 31 - daysExcess ||
    inputDay.value < 1 ||
    isNaN(inputDay.value) == true
  ) {
    inputDay.style.border = "1px solid var(--Light-red)";
    labelDay.style.color = "var(--Light-red)";
    dayError.style.visibility = "visible";
    dayError.innerHTML = "Must be a valid day";
    dayLock = true;
  } else {
    dayError.style.visibility = "hidden";
    inputDay.style.color = "var(--Off-black)";
    inputDay.style.border = "1px solid var(--Purple)";
    labelDay.style.color = "var(--Smokey-grey)";
    dayLock = false;
  }
  // check months
  if (inputMonth.value == "") {
    monthError.style.visibility = "visible";
    monthError.innerHTML = "This field is required";
    inputMonth.style.border = "1px solid var(--Light-red)";
    labelMonth.style.color = "var(--Light-red)";
    monthLock = true;
  } else if (
    inputMonth.value > 12 ||
    inputMonth.value < 1 ||
    isNaN(inputMonth.value) == true
  ) {
    inputMonth.style.border = "1px solid var(--Light-red)";
    labelMonth.style.color = "var(--Light-red)";
    monthError.style.visibility = "visible";
    monthError.innerHTML = "Must be a valid month";
    monthLock = true;
  } else {
    monthError.style.visibility = "hidden";
    inputMonth.style.color = "var(--Off-black)";
    inputMonth.style.border = "1px solid var(--Purple)";
    labelMonth.style.color = "var(--Smokey-grey)";
    monthLock = false;
  }
  // check years
  if (inputYear.value == "") {
    yearError.style.visibility = "visible";
    yearError.innerHTML = "This field is required";
    inputYear.style.border = "1px solid var(--Light-red)";
    labelYear.style.color = "var(--Light-red)";
    yearLock = true;
  } else if (
    inputYear.value > yearActual ||
    inputYear.value < 1 ||
    isNaN(inputYear.value) == true
  ) {
    inputYear.style.border = "1px solid var(--Light-red)";
    labelYear.style.color = "var(--Light-red)";
    yearError.style.visibility = "visible";
    yearError.innerHTML = "Must be a valid year";
    yearLock = true;
  } else {
    yearError.style.visibility = "hidden";
    inputYear.style.color = "var(--Off-black)";
    inputYear.style.border = "1px solid var(--Purple)";
    labelYear.style.color = "var(--Smokey-grey)";
    yearLock = false;
  }

  if (dayLock == false && monthLock == false && yearLock == false) {
    resultLock = false;
  } else {
    resultLock = true;
  }
}

function animation(yearCalc, monthCalc, dayCalc) {
  let yearCounter = 0;
  let monthCounter = 0;
  let dayCounter = 0;
  resultYears.innerHTML = "";
  resultMonths.innerHTML = "";
  resultDays.innerHTML = "";

  let yearInterval = setInterval(function () {
    if (yearCalc < 10) {
      resultYears.innerHTML = "";
      resultYears.style.marginLeft = "min(8vw, 2rem)";
    } else {
      resultYears.style.marginLeft = "0";
    }
    if (yearCalc > 99) {
      resultYears.style.left = "min(2vw, 1rem)";
    }
    resultYears.innerHTML = yearCounter;
    yearCounter++;
    if (yearCounter > yearCalc) {
      clearInterval(yearInterval);
      monthAnimation();
    }
  }, 50);

  function monthAnimation() {
    let monthInterval = setInterval(function () {
      if (monthCalc < 10) {
        resultMonths.innerHTML = "";
        resultMonths.style.marginLeft = "min(8vw, 2rem)";
      } else {
        resultMonths.style.marginLeft = "0";
      }
      resultMonths.innerHTML = monthCounter;
      monthCounter++;
      if (monthCounter > monthCalc) {
        clearInterval(monthInterval);
        dayAnimation();
      }
    }, 50);
  }

  function dayAnimation() {
    let dayInterval = setInterval(function () {
      if (dayCalc < 10) {
        resultDays.innerHTML = "";
        resultDays.style.marginLeft = "min(8vw, 2rem)";
      } else {
        resultDays.style.marginLeft = "0";
      }
      resultDays.innerHTML = dayCounter;
      dayCounter++;
      if (dayCounter > dayCalc) {
        clearInterval(dayInterval);
      }
    }, 50);
  }
}