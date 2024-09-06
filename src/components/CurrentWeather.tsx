import { fetchWeatherApi } from "openmeteo";
import { findCurrentTemperature } from "../utils/findCurrentTemperature";
import { logCoordinates } from "../utils/geocode";
import { Box } from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

// OPENMETEO
const params = {
  latitude: 52.349998474121094,
  longitude: 4.840000152587891,
  hourly: "temperature_2m",
  daily: ["temperature_2m_max", "temperature_2m_min"],
  timezone: "auto",
  models: "knmi_seamless",
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

const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
  hourly: {
    time: range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2m: hourly.variables(0)!.valuesArray()!,
  },
  daily: {
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2mMax: daily.variables(0)!.valuesArray()!,
    temperature2mMin: daily.variables(1)!.valuesArray()!,
  },
};

logCoordinates("Amsterdam"); // Coordinates should be fix is always the same...

const todaysMaxTemp = weatherData.daily.temperature2mMax[0].toFixed(1);
const todaysMinTemp = weatherData.daily.temperature2mMin[0].toFixed(1);

// Usage:
const currentTemperature = findCurrentTemperature(weatherData);

export const CurrentWeather = () => {
  return (
    <Box>
      <Box>{currentTemperature}°C</Box>
      <Box>
        <ArrowUpwardRoundedIcon />
        {todaysMaxTemp}°C
      </Box>
      <Box>
        <ArrowDownwardRoundedIcon />
        {todaysMinTemp}°C
      </Box>
    </Box>
  );
};
