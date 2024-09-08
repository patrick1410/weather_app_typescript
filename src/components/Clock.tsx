import { Typography } from "@mui/material";
import { updateTime } from "../utils/updateTime";
import { useEffect, useState } from "react";

export const Clock = () => {
  const [time, setTime] = useState<string>(updateTime()); // Initialize state with current time

  useEffect(() => {
    // Function to update the time state
    const updateCurrentTime = () => {
      setTime(updateTime());
    };

    // Set interval to update time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount

  return <Typography>{time}</Typography>;
};
