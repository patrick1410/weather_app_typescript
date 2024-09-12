import "./css/SearchResult.css";
import { SearchResultType } from "../types/searchResultType";

type SearchResultProps = {
  result: SearchResultType;
  handlePlace: (lat: number, long: number, name: string) => void; // Update the return type to void
};

export const SearchResult: React.FC<SearchResultProps> = ({
  result,
  handlePlace,
}) => {
  return (
    <div
      className="search-result"
      onClick={() =>
        handlePlace(result.latitude, result.longitude, result.name)
      }
    >
      {result.country_code}, {result.name}
      {result.admin1 ? "," : ""} {result.admin1}
    </div>
  );
};
