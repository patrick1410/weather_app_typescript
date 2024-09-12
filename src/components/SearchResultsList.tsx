import "./css/SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result: { id: number }) => {
        console.log(result);
        return <SearchResult result={result} key={result.id} />;
      })}
    </div>
  );
};
