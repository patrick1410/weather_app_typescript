export const getWindDirection = (degrees: number) => {
  if (degrees >= 337.5 || degrees < 22.5) {
    return { name: "N", icon: "⬆️" };
  }
  if (degrees >= 22.5 && degrees < 67.5) {
    return { name: "NE", icon: "↗️" };
  }
  if (degrees >= 67.5 && degrees < 112.5) {
    return { name: "E", icon: "➡️" };
  }
  if (degrees >= 112.5 && degrees < 157.5) {
    return { name: "SE", icon: "↘️" };
  }
  if (degrees >= 157.5 && degrees < 202.5) {
    return { name: "S", icon: "⬇️" };
  }
  if (degrees >= 202.5 && degrees < 247.5) {
    return { name: "SW", icon: "↙️" };
  }
  if (degrees >= 247.5 && degrees < 292.5) {
    return { name: "W", icon: "⬅️" };
  }
  if (degrees >= 292.5 && degrees < 337.5) {
    return { name: "NW", icon: "↖️" };
  }

  return { name: "Unknown", icon: "❓" };
};
