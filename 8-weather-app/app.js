const daysOfWeekMap = {
  0: "SUN",
  1: "MON",
  2: "TUES",
  3: "WED",
  4: "THUR",
  5: "FRI",
  6: "SAT",
};

const iconNameToSizeMap = {
  cloudy: { width: 264, height: 166 },
  sunny: { width: 208, height: 213 },
  stormy: { width: 246, height: 187 },
  snowy: { width: 230, height: 196 },
  "partly-cloudy": { width: 230, height: 209 },
  rainy: { width: 160, height: 222 },
};

const weatherMap = {
  cloudy: {
    temp: 72,
    precipitation: 84,
    low: 28,
  },
  sunny: {
    temp: 65,
    precipitation: 84,
    low: 28,
  },
  stormy: {
    temp: 67,
    precipitation: 84,
    low: 28,
  },
  snowy: {
    temp: 32,
    precipitation: 84,
    low: 28,
  },
  "partly-cloudy": {
    temp: 57,
    precipitation: 84,
    low: 28,
  },
  rainy: {
    temp: 63,
    precipitation: 84,
    low: 28,
  },
};

const weatherKeys = [
  "cloudy",
  "sunny",
  "stormy",
  "snowy",
  "partly-cloudy",
  "rainy",
];

let sevenDays = [];
let weatherForSevenDays = [];

function createDay(day, weatherInfo, weather, icon) {
  return `<div class="day">
        <div class="day-of-week">${day.dayName}</div>
        <div class="date">${day.dayNum}</div>

        <div class="bar ${weather}">
          <div class="weather">
            <svg role="img" width="${icon.width}" height="${icon.height}" viewBox="0 0 ${icon.width} ${icon.height}">
              <use xlink:href="#${weather}"></use>
            </svg>
          </div>
          <div class="temperature">${weatherInfo.temp}<span class="degrees">&deg;</span></div>
          <div class="content">
            <div class="precipitation">
              <svg role="img" class="icon">
                <use xlink:href="#precipitation"></use>
              </svg>
              ${weatherInfo.precipitation}%
            </div>
            <div class="low">
              <svg role="img" class="icon">
                <use xlink:href="#low"></use>
              </svg>
              ${weatherInfo.low}&deg;
            </div>
          </div>
        </div>
      </div>`;
}

function getSevenDaysFromCurrent() {
  const currentDate = new Date();
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(currentDate.getTime());
    newDate.setDate(currentDate.getDate() + i);
    sevenDays.push({
      dayName: daysOfWeekMap[newDate.getDay()],
      dayNum: newDate.getDate(),
    });
  }
}

function generateSevenWeatherKeys() {
  for (let i = 0; i < 7; i++) {
    const randomIdx = Math.floor(Math.random() * 6);
    weatherForSevenDays.push(weatherKeys[randomIdx])
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".wrapper");

  getSevenDaysFromCurrent();
  generateSevenWeatherKeys();

  sevenDays.forEach((day, i) => {
    const key = weatherForSevenDays[i];
    const icon = iconNameToSizeMap[key];
    wrapper.innerHTML += createDay(day, weatherMap[key], key, icon);
  });
});
