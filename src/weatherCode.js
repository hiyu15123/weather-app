export const weatherCodes = {
   0: { label: "快晴", icon: "☀️" },
   1: { label: "晴れ", icon: "🌤️" },
   2: { label: "一部曇り", icon: "⛅" },
   3: { label: "曇り", icon: "☁️" },
   45: { label: "霧", icon: "🌫️" },
   48: { label: "霧", icon: "🌫️" },
   51: { label: "霧雨", icon: "🌦️" },
   53: { label: "霧雨", icon: "🌦️" },
   55: { label: "霧雨", icon: "🌦️" },
   56: { label: "着氷性の霧雨", icon: "🌧️" },
   57: { label: "着氷性の霧雨", icon: "🌧️" },
   61: { label: "弱い雨", icon: "🌧️" },
   63: { label: "雨", icon: "🌧️" },
   65: { label: "強い雨", icon: "🌧️" },
   66: { label: "着氷性の雨", icon: "🌧️" },
   67: { label: "着氷性の雨", icon: "🌧️" },
   71: { label: "弱い雪", icon: "🌨️" },
   73: { label: "雪", icon: "🌨️" },
   75: { label: "強い雪", icon: "🌨️" },
   77: { label: "雪", icon: "🌨️" },
   80: { label: "にわか雨", icon: "🌦️" },
   81: { label: "にわか雨", icon: "🌦️" },
   82: { label: "激しいにわか雨", icon: "⛈️" },
   85: { label: "にわか雪", icon: "🌨️" },
   86: { label: "にわか雪", icon: "🌨️" },
   95: { label: "雷雨", icon: "⛈️" },
   96: { label: "雷雨", icon: "⛈️" },
   97: { label: "激しい雷雨", icon: "⛈️" },
   99: { label: "雷雨", icon: "⛈️" },
};

const unknown = { label: "不明", icon: "❓" };

export function getWeatherInfo(code) {
   return weatherCodes[code] ?? unknown;
};