import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

export const SearchField = () => {
  return (
    <TextField
      // label="Location"
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
              <LocationSearchingIcon sx={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
