import { getWeatherInfo } from "./weatherCode.js";
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

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
         return `<td><span aria-hidden="true">${icon}</span> ${label}</td>`;
      })
      .join("");

   container.innerHTML = `
      <table>
         <caption>1時間ごとの天気を表示しています</caption>
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
   `;
}

function createDayCard(daily, index, hourly) {
   const date = daily.time[index];
   const d = new Date(`${date}T00:00`);
   const month = d.getMonth() + 1;
   const day = d.getDate();
   const weekday = WEEKDAYS[d.getDay()];

   const { label, icon } = getWeatherInfo(daily.weather_code[index]);
   const max = Math.round(daily.temperature_2m_max[index]);
   const min = Math.round(daily.temperature_2m_min[index]);

   const rainCells = [0, 1, 2, 3]
      .map((block) => {
         const start = index * 24 + block * 6;
         const values = hourly.precipitation_probability.slice(
            start,
            start + 6,
         );
         return `<td>${Math.max(...values)}%</td>`;
      })
      .join("");

   return `
      <article class="day-card">
         <h3>${month}月${day}日（${weekday}）</h3>
         <div class="day-card__summary">
            <span class="day-card__icon" aria-hidden="true">${icon}</span>
            <p class="day-card__weather">${label}</p>
            <p class="day-card__temp">
               <span class="day-card__max">最高 ${max}℃</span>
               <span class="day-card__min">最低 ${min}℃</span>
            </p>
         </div>
         <table class="day-card__rain">
            <caption class="visually-hidden">
               6時間ごとの降水確率
            </caption>
            <tr>
               <th scope="row">時間</th>
               <td>0-6</td>
               <td>6-12</td>
               <td>12-18</td>
               <td>18-24</td>
            </tr>
            <tr>
               <th scope="row">降水</th>
               ${rainCells}
            </tr>
         </table>
         <p class="day-card__wind">風：北東 最大4m/s</p>
      </article>
   `;
}

export function renderDayCards(container, daily, hourly) {
   container.innerHTML = [0, 1]
      .map((index) => createDayCard(daily, index, hourly))
      .join("");
}
