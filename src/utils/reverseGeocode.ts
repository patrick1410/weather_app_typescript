export const reverseGeocode = async (lat: number, long: number) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&addressdetails=1`
    );
    const data = await response.json();

    // Check if the data contains an address
    console.log(data.address);
    return `${
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.hamlet
    }`;
  } catch (error) {
    console.error(error);
  }
};
