import { Geolocation } from "@capacitor/geolocation";

export const printLocation = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return coordinates;
};

export const getCoordinates = async () => {
  const coordinates = await printLocation();

  const latitude = coordinates.coords.latitude;
  const longitude = coordinates.coords.longitude;

  return { latitude, longitude };
};
