export async function fetchWeather(latitude, longitude) {
   const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      hourly: "temperature_2m,precipitation_probability,weather_code",
      timezone: "auto",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      current: "temperature_2m",
      wind_speed_unit: "ms",
   });

   const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

   if (!response.ok) {
      throw new Error(`天気の取得に失敗しました: ${response.status}`);
   }

   return response.json();
}