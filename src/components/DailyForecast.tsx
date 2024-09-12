import { Box, Card, CardContent, Typography } from "@mui/material";
import { WeatherData } from "../types/weatherData";
import { weatherIcons } from "../utils/weatherIcons";
import { WeatherIconEntry } from "../types/weatherIconEntry";
import { DailyItem } from "./DailyItem";

interface DailyForecastProps {
  weatherData: WeatherData;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  weatherData,
}) => {
  const { temperature2mMax, temperature2mMin, time } = weatherData.daily;

  // Create a lookup object from weatherIcons array
  const weatherIconLookup: { [key: number]: WeatherIconEntry } =
    weatherIcons.reduce((lookup, entry) => {
      lookup[entry.code] = entry;
      return lookup;
    }, {} as { [key: number]: WeatherIconEntry });

  // Get the weather codes array
  const weatherCodes = weatherData.daily.weatherCode;

  // Map over the weather codes to get corresponding weather icons
  const weatherInfo = weatherCodes.map((code) => {
    const weatherObj = weatherIconLookup[code];
    return weatherObj ? weatherObj : { name: "Unknown", icon: "❓" }; // Default if code is not found
  });

  const days = time.map((day) => day.toDateString().slice(0, 3));

  return (
    <Card sx={{ boxShadow: "0px 0px 8px #ddd" }}>
      <CardContent sx={{ p: "1rem !important" }}>
        <Typography mb={1} variant="h3" fontSize="2rem">
          Daily Forecast
        </Typography>
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
          }}
        >
          {days.map((day, index) => (
            <DailyItem
              key={index}
              day={day}
              name={weatherInfo[index].name}
              icon={weatherInfo[index].icon}
              temperature2mMax={Math.round(temperature2mMax[index])}
              temperature2mMin={Math.round(temperature2mMin[index])}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
