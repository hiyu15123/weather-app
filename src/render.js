import { getWeatherInfo } from "./weatherCode.js";

export function renderTimetable(container, hourly) {
   const timeCells = hourly.time
      .map((time) => `<th scope="col">${time.slice(11, 13)}時</th>`)
      .join("");

   const temperatureCells = hourly.temperature_2m
      .map((temperature) => `<td>${temperature}°C</td>`)
      .join("");

   const rainCells = hourly.precipitation_probability
      .map((probability) => `<td>${probability}%</td>`)
      .join("");

   const weatherCells = hourly.weather_code
      .map((code) => {
         const { label, icon } = getWeatherInfo(code);
         return `<td><span area-hidden="true">${icon}</span> ${label}</td>`;
      })
      .join("");

   container.innerHTML = `
      <table>
         <thead>
            <tr>
               <th scope="col">時間</th>
               ${timeCells}
            </tr>
         </thead>
         <tbody>
            <tr>
               <th scope="row">気温</th>
               ${temperatureCells}
            </tr>
            <tr>
               <th scope="row">降水確率</th>
               ${rainCells}
            </tr>
            <tr>
               <th scope="row">天気</th>
               ${weatherCells}
            </tr>
         </tbody>
      </table>
      <caption>1時間ごとの天気を表示しています</caption>
   `;
}

export function renderDayCards(container) {
   container.innerHTML = `
      <article class="day-card">
         <h3>10月3日(土)</h3>
         <div class="day-card__summary">
            <span class="day-card__icon" aria-hidden="true">🌤️</span>
            <p class="day-card__weather">晴れ時々曇り</p>
            <p class="day-card__temp">
               <span class="day-card__max">最高 27℃</span>
               <span class="day-card__min">最低 16℃</span>
            </p>
         </div>
         <p class="day-card__wind">風：北東 最大4m/s</p>
      </article>
   `;
}
