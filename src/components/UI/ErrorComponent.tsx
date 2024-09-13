import { Box, Typography, Link } from "@mui/material";

type ErrorComponentProps = {
  error: string;
  color: string;
};

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  error,
  color,
}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography variant="h2" color={color}>
        {error}
      </Typography>
      <Typography color={color}>
        Try to{" "}
        <Link color={color} sx={{ textDecoration: "none" }} href="/">
          reload
        </Link>{" "}
        the page
      </Typography>
    </Box>
  );
};
