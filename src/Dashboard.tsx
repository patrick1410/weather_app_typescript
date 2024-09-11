import "./Dashboard.css";
import { fetchWeatherApi } from "openmeteo";
import { Header } from "./components/Header";
import { SearchField } from "./components/SearchField";
import { CurrentWeather } from "./components/CurrentWeather";
import { DailyForecast } from "./components/DailyForecast";
import { Box, Card, CardContent } from "@mui/material";
import { getCoordinates } from "./utils/printLocation";
import { useEffect, useState } from "react";
import { WeatherData } from "./types/weatherData";

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
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [long, setLong] = useState<number | undefined>(undefined);
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );

  useEffect(() => {
    // Fetch coordinates
    const fetchCoordinates = async () => {
      try {
        const coordinatesObj = await getCoordinates();
        setLat(coordinatesObj.latitude);
        setLong(coordinatesObj.longitude);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    // Fetch weather data if lat and long are defined
    const fetchData = async () => {
      if (lat === undefined || long === undefined) {
        return;
      }

      try {
        const params = {
          latitude: lat,
          longitude: long,
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
          Array.from(
            { length: (stop - start) / step },
            (_, i) => start + i * step
          );

        // Process first location
        const response = responses[0];

        // // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current()!;
        const daily = response.daily()!;

        const newWeatherData = {
          current: {
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
            weatherCode: Array.from(daily.variables(0)!.valuesArray()!),
            temperature2mMax: Array.from(daily.variables(1)!.valuesArray()!),
            temperature2mMin: Array.from(daily.variables(2)!.valuesArray()!),
          },
        };

        setWeatherData(newWeatherData);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [lat, long]); // Run when lat or long changes

  // function to retrieve coordinates and set them (for location icon!)
  const handleClick = async () => {
    const coordinatesObj = await getCoordinates();
    setLat(coordinatesObj.latitude);
    setLong(coordinatesObj.longitude);
    console.log(coordinatesObj.latitude);
    console.log(coordinatesObj.longitude);
  };

  if (!weatherData) {
    // Show a loading state while data is being fetched
    return (
      <>
        <div>Loading weather data...</div>
        <button onClick={handleClick}>retrieve data manually</button>
      </>
    );
  }

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      className="dashboard"
    >
      <Card>
        <CardContent>
          <Header />
          <SearchField />
          <CurrentWeather weatherData={weatherData} />
          <DailyForecast weatherData={weatherData} />
        </CardContent>
      </Card>
    </Box>
  );
};
