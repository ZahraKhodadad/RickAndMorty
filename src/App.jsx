import { useEffect, useState } from "react";

import "./App.css";
import Navbar, { Search } from "./components/Navbar/Navbar";
import CharacterList from "./components/CharacterList/CharacterList";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [theme, setTheme] = useState(null);
  // const [changedTheme,setChangedTheme] = useState(false);

  const toggleSearchHandler = () => {
    setOpenSearch((prev) => !prev);
  };

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (window.matchMedia(`(prefers-color-scheme:dark)`).matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setThemeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Navbar
        toggleSearchHandler={toggleSearchHandler}
        setThemeHandler={setThemeHandler}
        theme={theme}
      />
      
      <div
        className={`toggleSearch ${openSearch ? "toggleSearchClicked" : ""}`}
      >
        <Search>
          <div className="nav_result">
            <span>X Character Exsist</span>
          </div>
        </Search>
      </div>
      <div className="characters">
        <CharacterList Characters={allCharacters} />
        <CharacterDetail  />
      </div>
    </>
  );
}

export default App;
