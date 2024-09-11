import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

interface SearchFieldProps {
  handleLocation: () => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({ handleLocation }) => {
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
                  onClick={handleLocation}
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
