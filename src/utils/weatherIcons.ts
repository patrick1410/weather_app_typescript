type WeatherIconEntry = {
  code: number; // Weather code
  name: string; // Name of the weather condition
  icon: string; // Icon or image path
};

export const weatherIcons: WeatherIconEntry[] = [
  { code: 0, name: "Clear sky", icon: "☀️" }, // Clear sky
  { code: 1, name: "Mainly clear", icon: "🌤️" }, // Mainly clear
  { code: 2, name: "Partly cloudy", icon: "🌥️" }, // Partly cloudy
  { code: 3, name: "Overcast", icon: "☁️" }, // Overcast
  { code: 45, name: "Fog", icon: "🌫️" }, // Fog
  { code: 48, name: "Depositing rime fog", icon: "🌫️" }, // Depositing rime fog
  { code: 51, name: "Light drizzle", icon: "🌦️" }, // Light drizzle
  { code: 53, name: "Moderate drizzle", icon: "🌦️" }, // Moderate drizzle
  { code: 55, name: "Dense drizzle", icon: "🌧️" }, // Dense drizzle
  { code: 56, name: "Light freezing drizzle", icon: "🌧️" }, // Light freezing drizzle
  { code: 57, name: "Dense freezing drizzle", icon: "🌧️" }, // Dense freezing drizzle
  { code: 61, name: "Slight rain", icon: "🌦️" }, // Slight rain
  { code: 63, name: "Moderate rain", icon: "🌧️" }, // Moderate rain
  { code: 65, name: "Heavy rain", icon: "🌧️" }, // Heavy rain
  { code: 66, name: "Light freezing rain", icon: "🌧️" }, // Light freezing rain
  { code: 67, name: "Heavy freezing rain", icon: "🌧️" }, // Heavy freezing rain
  { code: 71, name: "Slight snow fall", icon: "❄️" }, // Slight snow fall
  { code: 73, name: "Moderate snow fall", icon: "❄️" }, // Moderate snow fall
  { code: 75, name: "Heavy snow fall", icon: "❄️" }, // Heavy snow fall
  { code: 77, name: "Snow grains", icon: "🌨️" }, // Snow grains
  { code: 80, name: "Slight rain showers", icon: "🌦️" }, // Slight rain showers
  { code: 81, name: "Moderate rain showers", icon: "🌧️" }, // Moderate rain showers
  { code: 82, name: "Violent rain showers", icon: "🌧️" }, // Violent rain showers
  { code: 85, name: "Slight snow showers", icon: "❄️" }, // Slight snow showers
  { code: 86, name: "Heavy snow showers", icon: "❄️" }, // Heavy snow showers
  { code: 95, name: "Thunderstorm (slight or moderate)", icon: "⛈️" }, // Thunderstorm (slight or moderate)
  { code: 96, name: "Thunderstorm with slight hail", icon: "⛈️" }, // Thunderstorm with slight hail
  { code: 99, name: "Thunderstorm with heavy hail", icon: "⛈️" }, // Thunderstorm with heavy hail
];
