// LATER FOR DARKMODE!

// import "./App.css";
// import { Box } from "@mui/material";
// import { Dashboard } from "./DashBoard";
// import { useState } from "react";

// export const App = () => {
//   const [isDark, setIsDark] = useState(false);

//   return (
//     <Box className="app" data-theme={isDark ? "dark" : "light"}>
//       <Dashboard isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
//     </Box>
//   );
// };

import "./App.css";
import { Box } from "@mui/material";
import { Dashboard } from "./Dashboard";

export const App = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      className="app"
    >
      <Dashboard />
    </Box>
  );
};
