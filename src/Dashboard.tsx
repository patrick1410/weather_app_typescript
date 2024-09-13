import "./Dashboard.css";
import { fetchWeatherApi } from "openmeteo";
import { Header } from "./components/Header";
import { CurrentWeather } from "./components/CurrentWeather";
import { DailyForecast } from "./components/DailyForecast";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getCoordinates } from "./utils/printLocation";
import { useEffect, useState } from "react";
import { WeatherData } from "./types/weatherData";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import { SearchResultType } from "./types/searchResultType";
import { reverseGeocode } from "./utils/reverseGeocode";
import { ErrorComponent } from "./components/ErrorComponent";
import { LoadingComponent } from "./components/LoadingComponent";

export const Dashboard = () => {
  const [results, setResults] = useState<SearchResultType[]>([]);
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [long, setLong] = useState<number | undefined>(undefined);
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>(
    undefined
  );
  const [input, setInput] = useState<string>("");
  const [placeName, setPlaceName] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const fetchData = async () => {
    if (lat === undefined || long === undefined) {
      return;
    }

    setIsLoading(true); // Start loading
    setError(null); // Reset error state

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

      // Only call reverseGeocode if placeName is not already set
      if (!placeName) {
        const place = await reverseGeocode(lat, long);
        setPlaceName(place);
      }

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
      setError(`${error}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-fetch every 15 minutes
    const intervalId = setInterval(fetchData, 15 * 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [lat, long]);

  const handleRefresh = () => {
    fetchData();
  };

  // Function to retrieve coordinates and set them (for location icon!)
  const handleLocation = async () => {
    const coordinatesObj = await getCoordinates();

    if (coordinatesObj.latitude !== lat || coordinatesObj.longitude !== long) {
      const place = await reverseGeocode(
        coordinatesObj.latitude,
        coordinatesObj.longitude
      );

      setLat(coordinatesObj.latitude);
      setLong(coordinatesObj.longitude);
      setPlaceName(place);
    }
  };

  // Funtion to select the place from dropdown and set them!
  const handlePlace = (lat: number, long: number, place: string) => {
    setLat(lat);
    setLong(long);
    setPlaceName(place);
    setInput("");
    setResults([]);
  };

  // If error show ErrorComponent
  if (error) {
    return (
      <>
        <ErrorComponent error={error} color={"#B22222"} />
      </>
    );
  }

  // If isLoading || !weatherData show loading Component
  if (isLoading || !weatherData) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="dashboard"
    >
      <Card
        sx={{
          width: { xs: "100%", md: "auto" },
          boxShadow: "0px 0px 8px #ddd",
          borderRadius: "15px",
          background: "none",
        }}
        className="dashboard-card"
      >
        <CardContent>
          <Header />
          <SearchBar
            input={input}
            setInput={setInput}
            setResults={setResults}
            handleLocation={handleLocation}
          />
          {results && results.length > 0 && (
            <SearchResultsList handlePlace={handlePlace} results={results} />
          )}
          <CurrentWeather
            weatherData={weatherData}
            handleRefresh={handleRefresh}
            placeName={placeName}
          />
          <DailyForecast weatherData={weatherData} />
        </CardContent>
      </Card>
    </Box>
  );
};
