// import { fetchWeatherApi } from "openmeteo";
import { Box, Typography } from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import { weatherIcons } from "../utils/weatherIcons";
import { updateTime } from "../utils/updateTime";
import { useEffect, useState } from "react";
import { getWindDirection } from "../utils/getWindDirection";
import { WeatherData } from "../types/weatherData";

interface CurrentWeatherProps {
  weatherData: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
}) => {
  const currentTemperature = weatherData.current.temperature2m.toFixed(1);
  const currentWeatherObj = weatherIcons[weatherData.current.weatherCode]; // Get the current weatherObj to get an icon and name
  const todaysMaxTemp = weatherData.daily.temperature2mMax[0].toFixed(1);
  const todaysMinTemp = weatherData.daily.temperature2mMin[0].toFixed(1);
  const feelsLike = Number(weatherData.current.apparentTemperature).toFixed(1);
  const humidity = weatherData.current.relativeHumidity2m;
  const windSpeed = Math.round(weatherData.current.windSpeed10m);
  const windDirection = getWindDirection(weatherData.current.windDirection10m); // Get the wind direction name and icon based on the degrees from the weather data.
  const surfacePressure = Math.round(weatherData.current.surfacePressure);

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
