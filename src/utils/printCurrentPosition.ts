import { Geolocation } from "@capacitor/geolocation";

export const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return coordinates;
};
