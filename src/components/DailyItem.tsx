import { Card, CardContent, Typography } from "@mui/material";

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
    <Card
      sx={{
        all: "unset",
        width: "calc(100%/7)",
        m: "10px",
        boxShadow: "0px 0px 8px #ddd",
        borderRadius: "15px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>{day}</Typography>
        <Typography>{icon}</Typography>
        <Typography>{name}</Typography>
        <Typography>
          {temperature2mMax}°C/{temperature2mMin}°C
        </Typography>
      </CardContent>
    </Card>
  );
};
