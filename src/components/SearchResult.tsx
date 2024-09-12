import "./css/SearchResult.css";

export const SearchResult = ({ result, handlePlace }) => {
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
