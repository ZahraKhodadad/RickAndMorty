import { useEffect, useRef, useState } from "react";

import "./App.css";
import Navbar, { Search } from "./components/Navbar/Navbar";
import CharacterList from "./components/CharacterList/CharacterList";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [theme, setTheme] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const paragraphref = useRef(null);

  const toggleSearchHandler = () => {
    setOpenSearch((prev) => !prev);
  };

  // const showHandler = () => {
  //   if (window.innerWidth < 740) {
  //     window.scrollTo({
  //       top: paragraphref.current.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  //   setShowItem((prev) => !prev);
  // };
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );
        // console.log(data.results);
        setCharacters(data.results);
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    if (characters) fetchData();
  }, [query]);
  const setThemeHandler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Toaster />
      <Navbar
        toggleSearchHandler={toggleSearchHandler}
        setThemeHandler={setThemeHandler}
        theme={theme}
        query={query}
        setQuery={setQuery}
      />

      <div
        className={`toggleSearch ${openSearch ? "toggleSearchClicked" : ""}`}
      >
        <Search query={query} setQuery={setQuery}>
          <div className="nav_result">
            <span>X Character Exsist</span>
          </div>
        </Search>
      </div>
      <div className="characters">
        <CharacterList
          characters={characters}
          paragraphref={paragraphref}
          loading={loading}
        />

        <div className="characterDetail" ref={paragraphref}>
          <CharacterDetail />
        </div>
      </div>
    </>
  );
}

export default App;
