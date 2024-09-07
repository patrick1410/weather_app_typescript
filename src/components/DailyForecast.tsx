import { Box, Typography } from "@mui/material";
import { WeatherData } from "../types/weatherData";

interface DailyForecastProps {
  weatherData: WeatherData;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({
  weatherData,
}) => {
  console.log(
    "weatherdata in dailyforecast:",
    weatherData.current.apparentTemperature
  );
  return (
    <Box>
      <Typography variant="h3" fontSize="2rem">
        Daily Forecast
      </Typography>
    </Box>
  );
};
