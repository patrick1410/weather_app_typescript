import "./css/SearchResult.css";
import { SearchResultType } from "../types/searchResultType";
import ReactCountryFlag from "react-country-flag";

type SearchResultProps = {
  result: SearchResultType;
  handlePlace: (lat: number, long: number, name: string) => void;
};

export const SearchResult: React.FC<SearchResultProps> = ({
  result,
  handlePlace,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      className="search-result"
      onClick={() =>
        handlePlace(result.latitude, result.longitude, result.name)
      }
    >
      <ReactCountryFlag
        style={{ marginRight: "0.5rem" }}
        svg
        countryCode={result.country_code}
      />{" "}
      {result.name}
      {result.admin1 ? "," : ""} {result.admin1}
    </div>
  );
};
