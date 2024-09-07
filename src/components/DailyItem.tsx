import { Box, Typography } from "@mui/material";

interface DailyItemProps {
  day: string;
  name: string;
  icon: string;
  temperature2mMax: number;
  temperature2mMin: number;
}

export const DailyItem: React.FC<DailyItemProps> = ({
  day,
  name,
  icon,
  temperature2mMax,
  temperature2mMin,
}) => {
  return (
    <Box sx={{ border: "1px solid black" }}>
      <Typography>{day}</Typography>
      <Typography>{icon}</Typography>
      <Typography>{name}</Typography>
      <Typography>
        {temperature2mMax}°C/{temperature2mMin}°C
      </Typography>
    </Box>
  );
};
