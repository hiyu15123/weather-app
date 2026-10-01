import { fetchWeather } from "./api.js";
import { renderTimetable } from "./render.js";
import { cities } from "./cities.js";

// 1. fetchWeatherで取得
// 2. toHourlyListで組み替え
// 3. renderTimetableで表示

async function showWeather(latitude, longitude) {
   const data = await fetchWeather(latitude, longitude);
   renderTimetable(document.getElementById("app"), data.hourly);
}

// 都市選択用のオプションを生成
const citySelect = document.getElementById("city-select");

cities.forEach((city) => {
   const option = document.createElement("option");
   option.value = `${city.latitude},${city.longitude}`;
   option.textContent = city.name;
   citySelect.appendChild(option);
});

citySelect.addEventListener("change", () => {
   const [latitude, longitude] = citySelect.value.split(",").map(Number);
   showWeather(latitude, longitude);
});
