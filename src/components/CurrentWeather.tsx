import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import CompressIcon from "@mui/icons-material/Compress";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { weatherIcons } from "../utils/weatherIcons";
import { getWindDirection } from "../utils/getWindDirection";
import { WeatherData } from "../types/weatherData";
import { Clock } from "./Clock";

interface CurrentWeatherProps {
  weatherData: WeatherData;
  handleRefresh: () => void;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  weatherData,
  handleRefresh,
}) => {
  const currentTemperature = Math.round(weatherData.current.temperature2m);
  const currentWeatherObj = weatherIcons.find(
    (entry) => entry.code === weatherData.current.weatherCode
  ); // Get the current weatherObj to get an icon and name
  const feelsLike = Number(Math.round(weatherData.current.apparentTemperature));
  const todaysMaxTemp = Math.round(weatherData.daily.temperature2mMax[0]);
  const todaysMinTemp = Math.round(weatherData.daily.temperature2mMin[0]);
  const humidity = weatherData.current.relativeHumidity2m;
  const windSpeed = Math.round(weatherData.current.windSpeed10m);
  const windDirection = getWindDirection(weatherData.current.windDirection10m); // Get the wind direction name and icon based on the degrees from the weather data.
  const surfacePressure = Math.round(weatherData.current.surfacePressure);

  return (
    <Card sx={{ mt: "1.25rem", mb: "1.25rem" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h2" fontSize="2rem">
            Current Weather
          </Typography>
          <RefreshRoundedIcon
            onClick={handleRefresh}
            sx={{ cursor: "pointer", color: "rgba(0, 0, 0, 0.54)" }}
          />
          {/* for refresh btn? #E0FFFF */}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* delete alignItems? */}
          <Box sx={{ width: "50%" }}>
            <Clock />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>
                {currentWeatherObj?.icon} {currentTemperature}°C
              </Typography>
              <Typography>{currentWeatherObj?.name}</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography>Feels like {feelsLike}°C</Typography>
            <Typography>
              <ArrowUpwardRoundedIcon sx={{ color: "#FF6347" }} />{" "}
              {todaysMaxTemp}°C
            </Typography>
            <Typography>
              <ArrowDownwardRoundedIcon sx={{ color: "#87CEEB" }} />{" "}
              {todaysMinTemp}°C
            </Typography>
            <Typography>
              <WaterDropIcon sx={{ color: "#1E90FF" }} /> Humidity {humidity}%
            </Typography>
            <Typography>
              <AirIcon sx={{ color: "#ADD8E6" }} /> Wind {windSpeed}kph{" "}
              {windDirection.icon}
              {windDirection.name}
            </Typography>
            <Typography>
              <CompressIcon sx={{ color: "#FFA07A" }} /> Pressure{" "}
              {surfacePressure}
              hPa
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
