// FIX THIS IS ALWAYS THE SAME...

export const fetchCoordinates = async (placeName: string) => {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=en&locality=${encodeURIComponent(
    placeName
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.latitude && data.longitude) {
      const { latitude, longitude } = data;
      return { latitude, longitude };
    } else {
      return null; // No results found
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

// Example usage
export const logCoordinates = async (placeName: string) => {
  const coordinates = await fetchCoordinates(placeName);
  if (coordinates) {
    console.log(`Coordinates for ${placeName}:`, coordinates);
  } else {
    console.log(`No coordinates found for ${placeName}`);
  }
};
