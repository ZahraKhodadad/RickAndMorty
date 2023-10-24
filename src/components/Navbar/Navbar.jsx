import { HeartIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
const Navbar = ({
  theme,
  toggleSearchHandler,
  setThemeHandler,
  query,
  setQuery,
}) => {
  return (
    <div className="navbar container">
      <div className="logo">Logo</div>

      <div className="search_box">
        <Search query={query} setQuery={setQuery}>
          <div className="nav_result">
            <span>X Character Exsist</span>
          </div>
        </Search>
      </div>

      <div className="icons_nav">
        <div>
          <button className="flex sm:hidden" onClick={toggleSearchHandler}>
            <MagnifyingGlassIcon className="icon" />
          </button>
        </div>
        <div className="heart">
          <HeartIcon className="icon red ml-2" />
          <span className="badge">4</span>
        </div>
        <div>
          {theme === "light" ? (
            <MoonIcon className="icon_mode" onClick={setThemeHandler} />
          ) : (
            <SunIcon className="icon_mode" onClick={setThemeHandler} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

export const Search = ({ children, query, setQuery }) => {
  return (
    <div className="w-[100%] flex justify-between items-center">
      <input
        className="search_input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="search..."
      />
      {children}
    </div>
  );
};
