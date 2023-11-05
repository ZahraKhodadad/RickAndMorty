import { Search } from "./Navbar/Navbar";

const SearchToggle = ({query,setQuery,openSearch}) => {
  return (
    <div className={`toggleSearch ${openSearch ? "toggleSearchClicked" : ""}`}>
      <Search query={query} setQuery={setQuery}>
        <div className="nav_result">
          <span>X Character Exsist</span>
        </div>
      </Search>
    </div>
  );
};

export default SearchToggle;
