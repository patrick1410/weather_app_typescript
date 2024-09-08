import { fetchWeatherApi } from "openmeteo";
import { Header } from "./components/Header";
import { SearchField } from "./components/SearchField";
import { CurrentWeather } from "./components/CurrentWeather";
import { DailyForecast } from "./components/DailyForecast";
import { Card, CardContent } from "@mui/material";
import { printCurrentPosition } from "./utils/printCurrentPosition";
// import { getCoordinates } from "./utils/geocode";

const coordinates = await printCurrentPosition();
const { latitude: lat, longitude: lon } = coordinates.coords;

const params = {
  latitude: lat,
  longitude: lon,
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "surface_pressure",
    "wind_speed_10m",
    "wind_direction_10m",
  ],
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
  timezone: "auto",
};
const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

const current = response.current()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  current: {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature2m: current.variables(0)!.value(),
    relativeHumidity2m: current.variables(1)!.value(),
    apparentTemperature: current.variables(2)!.value(),
    weatherCode: current.variables(3)!.value(),
    surfacePressure: current.variables(4)!.value(),
    windSpeed10m: current.variables(5)!.value(),
    windDirection10m: current.variables(6)!.value(),
  },
  daily: {
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    weatherCode: Array.from(daily.variables(0)!.valuesArray()!), // Converted to number[]
    temperature2mMax: Array.from(daily.variables(1)!.valuesArray()!),
    temperature2mMin: Array.from(daily.variables(2)!.valuesArray()!),
  },
};

// `weatherData` now contains a simple structure with arrays for datetime and weather data
// for (let i = 0; i < weatherData.daily.time.length; i++) {
// 	console.log(
// 		weatherData.daily.time[i].toISOString(),
// 		weatherData.daily.weatherCode[i],
// 		weatherData.daily.temperature2mMax[i],
// 		weatherData.daily.temperature2mMin[i]
// 	);
// }

// const coordinates = await getCoordinates("The Hague");
// console.log(coordinates.results);
// const { latitude: lat, longitude: lon, name } = coordinates.results[0];
// console.log(lat, lon, name);

// LATER FOR DARKMODE!

// import { ToggleMode } from "./components/ToggleTheme";

// Define the type for the props
// interface DashboardProps {
//   isChecked: boolean;
//   handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// export const Dashboard: React.FC<DashboardProps> = ({
//   isChecked,
//   handleChange,
// }) => {
//   return (
//     <>
//       <AbcIcon sx={{ fontSize: 60 }} />
//       <ToggleMode handleChange={handleChange} isChecked={isChecked} />
//     </>
//   );
// };

export const Dashboard = () => {
  return (
    <Card>
      <CardContent>
        <Header />
        <SearchField />
        <CurrentWeather weatherData={weatherData} />
        <DailyForecast weatherData={weatherData} />
      </CardContent>
    </Card>
  );
};
