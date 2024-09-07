export const getCoordinates = async (location: string) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`
    );

    if (response.ok) {
      const location = await response.json();
      return location;
    }
  } catch (error) {
    console.log(error);
  }
};
