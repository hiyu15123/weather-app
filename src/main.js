import { fetchWeather } from "./api.js";
import { toHourlyList } from "./format.js";
import { renderTimetable } from "./render.js";

// 1. fetchWeatherで取得
// 2. toHourlyListで組み替え
// 3. renderTimetableで表示

async function main() {
   const data = await fetchWeather(35.6895, 139.6917); // 東京の緯度経度
   console.log(data);
}

main();