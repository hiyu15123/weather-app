import { fetchWeather } from "./api.js";
import { renderTimetable } from "./render.js";
import { cities } from "./cities.js";
import { getCurrentLocation } from "./geolocation.js";

const app = document.getElementById("app");
const status = document.getElementById("status");

async function showWeather(latitude, longitude, placeName) {
   status.textContent = `天気を取得中です...`;
   try {
      const data = await fetchWeather(latitude, longitude);
      renderTimetable(app, data.hourly);
      status.textContent = `${placeName}の天気`;
   } catch(err) {
      status.textContent = `天気の取得に失敗しました`;
      app.textContent = `時間をおいて再度お試しください`;
      console.error(err);
   }
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
   const cityName = citySelect.selectedOptions[0].textContent;
   showWeather(latitude, longitude, cityName);
});

const locationButton = document.getElementById("current-location");

locationButton.addEventListener("click", async() => {
   status.textContent = `現在地を取得中...`;
   try {
      const { latitude, longitude } = await getCurrentLocation();
      showWeather(latitude, longitude, `現在地`);
   } catch (err) {
      status.textContent = `現在地を取得できませんでした`;
      app.textContent = `位置情報が使えません。都市を選択してください。`;
      console.error(err);
   }
});

showWeather(cities[0].latitude, cities[0].longitude, cities[0].name);