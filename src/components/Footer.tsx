import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Box, Typography, Link } from "@mui/material";

export const Footer = ({}) => {
  return (
    <Box
      sx={{
        mt: "1.25rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Typography>
        &copy;2024 Made by{" "}
        <Link
          sx={{ textDecoration: "none", color: "#f0f8ff;" }}
          href="https://www.linkedin.com/in/patrick-mankaryous/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Patrick Mankaryous{" "}
        </Link>
        with passion and fun!
      </Typography>
      <Box>
        <Link
          href="https://github.com/patrick1410"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="github-icon" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/patrick-mankaryous/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="linkedin-icon" />
        </Link>
      </Box>
    </Box>
  );
};
