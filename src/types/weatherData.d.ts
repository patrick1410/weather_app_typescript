// types.d.ts or a relevant types file
export interface WeatherData {
  current: {
    time: Date;
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
}
