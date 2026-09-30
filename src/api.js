export async function fetchWeather(latitude, longitude) {
   const params = new URLSearchParams({
      latitude: latitude,
      longitude: longitude,
      hourly: "temperature_2m,precipitation_probability,weather_code",
      timezone: "Asia/Tokyo",
      forecast_hours: 24,
   });

   const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

   if (!response.ok) {
      throw new Error(`天気の取得に失敗しました: ${response.status}`);
   }

   return response.json();
}