let forecastHeight = $(".contain-my-cards .row").innerHeight();
let mainInput = document.querySelector(".my-input");
let myResponse = [];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let theFirstDay;
let theFirstDayNo;
let theFirstMonth;
let thesecondtDay;
let thethirdtDay;
$(".layer").css("bottom", `${0.5 * forecastHeight}px`);

// Show the current weather of  user's place for first time
let myCountey = Intl.DateTimeFormat().resolvedOptions().timeZone;
myCountey = myCountey.split("/")[1];
console.log(myCountey);
async function current(myCountey) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b252ae4bd2864ee0a3f123905232502&q=${myCountey}&days=3`
  );
  let final = await res.json();
  getAllDateInfo(final);

  dispalyFirstCard(final);
  dispalysecond(final);
  dispalythird(final);
}

current(myCountey);

// Handle My nav bar for first time
const mediaQueryList = window.matchMedia("(max-width: 992px)");
if (mediaQueryList.matches) {
  $(".nav-link").addClass("new-nav-item");
  $(".nav-item").addClass("my-nav-item");
  $(".my-navbar-nav").addClass("my-navbar-nav");
} else {
  $(".nav-link").removeClass("new-nav-item");
  $(".nav-item").removeClass("my-nav-item");
  $(".my-navbar-nav").removeClass("my-navbar-nav");
}

// Handle My nav when resize screen
mediaQueryList.addEventListener("change", function screenTest(e) {
  if (e.matches) {
    $(".nav-link").addClass("new-nav-item");
    $(".nav-item").addClass("my-nav-item");
    $(".my-navbar-nav").addClass("my-navbar-nav");
  } else {
    $(".nav-link").removeClass("new-nav-item");
    $(".nav-item").removeClass("my-nav-item");
    $(".my-navbar-nav").removeClass("my-navbar-nav");
  }
});

// Fetch My Url
// Do not make change in my website if the current location is the same as direct revious location.

async function test(e) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=b252ae4bd2864ee0a3f123905232502&q=${e}&days=3`
  );
  let final = await res.json();

  if (res.status == 200) {
    getAllDateInfo(final);
    let location = final.location.name;
    if (myResponse.length < 2) {
      myResponse.push(location);
      if (myResponse.length === 1) {
        dispalyFirstCard(final);
        dispalysecond(final);
        dispalythird(final);
      } else if (!(myResponse[0] === myResponse[1])) {
        dispalyFirstCard(final);
        dispalysecond(final);
        dispalythird(final);
      }
    } else {
      myResponse.shift();
      myResponse.push(location);
      if (myResponse.length === 1) {
        dispalyFirstCard(final);
        dispalysecond(final);
        dispalythird(final);
      } else if (!(myResponse[0] === myResponse[1])) {
        dispalyFirstCard(final);
        dispalysecond(final);
        dispalythird(final);
      }
    }
  }
}

function getAllDateInfo(myResJson) {
  //HandleMyDay
  var dt1 = new Date(myResJson.current.last_updated);
  var dt2 = new Date(myResJson.forecast.forecastday[1].date);
  var dt3 = new Date(myResJson.forecast.forecastday[2].date);
  theFirstDay = dt1.getDay();
  thesecondtDay = dt2.getDay();
  thethirdtDay = dt3.getDay();
  theFirstDayNo = dt1.getDate();

  //HandleMyMonth
  theFirstMonth = dt1.getMonth();
}

document.querySelector(".my-input").addEventListener("keyup", function () {
  test(mainInput.value);
});

//Handle my umberella
// I can use umberella in case sky is very cloudy or no clouds
function getUmberella(final) {
  let wareUmb;
  let myCloud = final.current.cloud;
  if (myCloud <= 50) {
    wareUmb = 100 - myCloud * 2;
  } else if (myCloud > 50) {
    wareUmb = 2 * (myCloud - 50);
  }
  return wareUmb;
}

function dispalyFirstCard(final) {
  document.querySelector(
    ".my-first-card"
  ).innerHTML = `<p class="d-flex justify-content-between my-head-pa px-3 py-2">
  <span>${daysOfWeek[theFirstDay]}</span> <span>${theFirstDayNo}${
    monthNames[theFirstMonth]
  }</span>
</p>
<div class="p-3">
  <p class="mt-3">${final.location.name}</p>
  <div
    class="contain-my-fore d-flex justify-content-between align-items-center"
  >
    <div class="my-num">${Math.trunc(
      Number(final.current.temp_c)
    )}<sup>o</sup>C</div>
    <div
      class="my-fore-img flex-grow-1 d-flex justify-content-center align-items-center"
    >
      <img src="${final.current.condition.icon}" alt="" class="my-sunny" />
    </div>
  </div>
  <span class="day-condition">${final.current.condition.text}</span>
  <ul
    class="forecat-conclusion d-flex align-items-center justify-content-between mt-3 w-100"
  >
    <li>
      <i class="fas fa-umbrella"></i>
      <span class="my-small-font">${getUmberella(final)}%</span>
    </li>
    <li class="my-wind">
      <i class="fas fa-wind"></i>
      <span class="my-small-font">${Math.trunc(
        Number(final.current.wind_kph)
      )} Km/h</span>
    </li>
    <li class="my-location">
      <i class="fas fa-compass"></i>
      <span class="my-small-font">${final.location.tz_id.split("/")[0]}</span>
    </li>
  </ul>
</div>`;
}

function dispalysecond(final) {
  document.querySelector(
    ".my-second-card"
  ).innerHTML = `<p class="d-flex justify-content-center my-head-pa px-3 py-2">
  <span>${daysOfWeek[thesecondtDay]}</span>
</p>
<div
  class="p-3 text-center align-items-center flex-column d-flex justify-content-center gap-2 mt-5"
>
  <div
    class="contain-my-fore d-flex justify-content-between align-items-center flex-column gap-2"
  >
    <div
      class="my-fore-img flex-grow-1 d-flex justify-content-center align-items-center"
    >
      <img src="${
        final.forecast.forecastday[1].day.condition.icon
      }" alt="" class="w-75" />
    </div>
    <div class="my-num">${Math.trunc(
      Number(final.forecast.forecastday[1].day.maxtemp_c)
    )}<sup>o</sup>C</div>
    <div class="my-small-num">${Math.trunc(
      Number(final.forecast.forecastday[1].day.mintemp_c)
    )}<sup>o</sup>C</div>
  </div>
  <span class="day-condition">${
    final.forecast.forecastday[1].day.condition.text
  }</span>
</div>
</div>
`;
}

function dispalythird(final) {
  document.querySelector(
    ".my-third-card"
  ).innerHTML = `<p class="d-flex justify-content-center my-head-pa px-3 py-2">
  <span>${daysOfWeek[thethirdtDay]}</span>
</p>
<div
  class="p-3 text-center align-items-center flex-column d-flex justify-content-center gap-2 mt-5"
>
  <div
    class="contain-my-fore d-flex justify-content-between align-items-center flex-column gap-2"
  >
    <div
      class="my-fore-img flex-grow-1 d-flex justify-content-center align-items-center"
    >
      <img src="${
        final.forecast.forecastday[2].day.condition.icon
      }" alt="" class="w-75" />
    </div>
    <div class="my-num">${Math.trunc(
      Number(final.forecast.forecastday[2].day.maxtemp_c)
    )}<sup>o</sup>C</div>
    <div class="my-small-num">${Math.trunc(
      Number(final.forecast.forecastday[2].day.mintemp_c)
    )}<sup>o</sup>C</div>
  </div>
  <span class="day-condition">${
    final.forecast.forecastday[2].day.condition.text
  }</span>
</div>
</div>
`;
}
