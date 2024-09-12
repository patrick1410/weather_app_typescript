import "./css/SearchResultsList.css";
import { SearchResult } from "./SearchResult";
import { SearchResultType } from "../types/searchResultType";

type SearchResultsListProps = {
  results: SearchResultType[];
  handlePlace: (lat: number, long: number, name: string) => void; // Update the return type to void
};

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  results,
  handlePlace,
}) => {
  return (
    <div className="results-list">
      {results.map((result) => {
        console.log(result);
        return (
          <SearchResult
            handlePlace={handlePlace}
            result={result}
            key={result.id}
          />
        );
      })}
    </div>
  );
};
