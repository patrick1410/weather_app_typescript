export const findCurrentTemperature = (weatherData: any) => {
  const currentTime = new Date();

  // Convert both times (current and hourly times) to time in milliseconds for comparison
  const currentTimestamp = currentTime.getTime();

  // Find the index of the closest matching time in weatherData.hourly.time
  const closestTimeIndex = weatherData.hourly.time.findIndex(
    (time: Date) =>
      Math.abs(new Date(time).getTime() - currentTimestamp) < 3600000 // 1 hour range
  );

  const currentTemperature = weatherData.hourly.temperature2m[closestTimeIndex];

  return currentTemperature.toFixed(1);
};
