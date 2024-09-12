import { useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { Box } from "@mui/material";
import { SearchResultType } from "../types/searchResultType";
import debounce from "lodash/debounce";
import "./css/SearchBar.css";

type SearchBarProps = {
  setResults: (results: SearchResultType[]) => void;
  handleLocation: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  setResults,
  handleLocation,
}) => {
  const [input, setInput] = useState("");

  const fetchData = async (value: string) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10`
      );

      const data = await response.json();
      if (data.results) {
        setResults(data.results.map((result: SearchResultType[]) => result));
      }
      console.log(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Create a debounced version of fetchData with a 300ms delay
  const debouncedFetchData = useCallback(debounce(fetchData, 300), []);

  const handleChange = (value: string) => {
    setInput(value);
    // Close the results list if the input is empty
    if (value.trim() === "") {
      setResults([]); // Clear results
    } else {
      debouncedFetchData(value); // Use debounced fetch
    }
  };

  return (
    <Box className="input-container">
      <Box className="input-wrapper">
        <SearchIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
        <input
          placeholder="Search location..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <LocationSearchingIcon
          onClick={handleLocation}
          sx={{ color: "rgba(0, 0, 0, 0.54)", cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};
