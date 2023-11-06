import { Search } from "./Navbar/Navbar";

const SearchToggle = ({ query, setQuery, openSearch, characters }) => {
  return (
    <div className={`toggleSearch ${openSearch ? "toggleSearchClicked" : ""}`}>
      <Search query={query} setQuery={setQuery}>
        <div className="nav_result">
          <span>{characters.length} Character Exsist</span>
        </div>
      </Search>
    </div>
  );
};

export default SearchToggle;
