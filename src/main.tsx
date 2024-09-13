import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./Dashboard.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", Arial, Helvetica, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 769,
      lg: 1025,
      xl: 1201,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  </StrictMode>
);
