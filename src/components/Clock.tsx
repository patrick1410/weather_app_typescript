import { Typography } from "@mui/material";
import { updateTime } from "../utils/updateTime";
import { useEffect, useState } from "react";

type ClockProps = {
  timezone: string | "UTC";
};

export const Clock: React.FC<ClockProps> = ({ timezone }) => {
  const [time, setTime] = useState<string>(updateTime(timezone)); // Initialize state with current time

  useEffect(() => {
    // Function to update the time state
    const updateCurrentTime = () => {
      setTime(updateTime(timezone));
    };

    // Set interval to update time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <Typography>{time}</Typography>;
};
