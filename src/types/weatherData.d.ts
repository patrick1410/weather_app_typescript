export type WeatherData = {
  current: {
    temperature2m: number;
    relativeHumidity2m: number;
    apparentTemperature: number;
    weatherCode: number;
    surfacePressure: number;
    windSpeed10m: number;
    windDirection10m: number;
  };
  daily: {
    time: Date[];
    weatherCode: number[];
    temperature2mMax: number[];
    temperature2mMin: number[];
  };
};
