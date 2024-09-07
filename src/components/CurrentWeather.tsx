import { fetchWeatherApi } from "openmeteo";
import { Box, Typography } from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import { weatherIcons } from "../utils/weatherIcons";
import { updateTime } from "../utils/updateTime";
import { useEffect, useState } from "react";
import { getCoordinates } from "../utils/geocode";
import { getWindDirection } from "../utils/getWindDirection";

const params = {
  latitude: 52.374,
  longitude: 4.8897,
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
    weatherCode: daily.variables(0)!.valuesArray()!,
    temperature2mMax: daily.variables(1)!.valuesArray()!,
    temperature2mMin: daily.variables(2)!.valuesArray()!,
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

// Variables
const currentTemperature = weatherData.current.temperature2m.toFixed(1);
const currentWeatherObj = weatherIcons[weatherData.current.weatherCode]; // Get the current weatherObj to get an icon and name
const todaysMaxTemp = weatherData.daily.temperature2mMax[0].toFixed(1);
const todaysMinTemp = weatherData.daily.temperature2mMin[0].toFixed(1);
const feelsLike = Number(weatherData.current.apparentTemperature).toFixed(1);
const humidity = weatherData.current.relativeHumidity2m;
const windSpeed = Math.round(weatherData.current.windSpeed10m);
const windDirection = getWindDirection(weatherData.current.windDirection10m); // Get the wind direction name and icon based on the degrees from the weather data.
const surfacePressure = Math.round(weatherData.current.surfacePressure);

const coordinates = await getCoordinates("London");
// console.log(coordinates.results);
const { latitude: lat, longitude: lon, name } = coordinates.results[0];
console.log(lat, lon, name);

export const CurrentWeather = () => {
  const [time, setTime] = useState<string>(updateTime()); // Initialize state with current time

  useEffect(() => {
    // Function to update the time state
    const updateCurrentTime = () => {
      setTime(updateTime());
    };

    // Set interval to update time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Box>
      <Typography variant="h2" fontSize="2rem">
        Current Weather
      </Typography>
      <Typography>{time}</Typography>
      <Typography>
        {currentWeatherObj.name} {currentWeatherObj.icon} {currentTemperature}°C
      </Typography>
      <Typography>Feels like {feelsLike}°C</Typography>
      <Typography>
        <ArrowUpwardRoundedIcon /> {todaysMaxTemp}°C
      </Typography>
      <Typography>
        <ArrowDownwardRoundedIcon /> {todaysMinTemp}°C
      </Typography>
      <Typography>
        <WaterDropIcon /> Humidity {humidity}%
      </Typography>
      <Typography>
        <AirIcon /> Wind {windSpeed}kph{windDirection.icon}
        {windDirection.name}
      </Typography>
      <Typography>
        <CompressIcon /> Pressure {surfacePressure}hPa
      </Typography>
    </Box>
  );
};
