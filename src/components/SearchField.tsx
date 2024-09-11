import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

export const SearchField = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextField
        sx={{ mt: "1.25rem" }}
        id="outlined-size-small"
        placeholder="Enter location"
        size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <LocationSearchingIcon
                  onClick={() => console.log("click")}
                  sx={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};
