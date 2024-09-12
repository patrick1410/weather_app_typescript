import "./css/SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={() => alert(`You selected ${result.name}!`)}
    >
      {result.country_code}, {result.name}
      {result.admin1 ? "," : ""} {result.admin1}
    </div>
  );
};
