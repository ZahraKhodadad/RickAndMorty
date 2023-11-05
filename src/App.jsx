import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar, { Search } from "./components/Navbar/Navbar";
import CharacterList from "./components/CharacterList/CharacterList";
import { allCharacters } from "../data/data";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
import CharacterItem from "./components/CharacterItem/CharacterItem";
import { ArrowUpCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [theme, setTheme] = useState(null);
  const [query, setQuery] = useState("");
  const [arrowUpOpen, setArrowUpOpen] = useState(false);
  const { loading, characters } = useFetch(
    query,
    "https://rickandmortyapi.com/api/character?name"
  );
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState();
  const [favourites, setFavourite] = useLocalStorage("FAVOURITE", []);
  const paragraphref = useRef(null);
  const refValue = useRef();
  const toggleSearchHandler = () => {
    setOpenSearch((prev) => !prev);
  };

  const showHandler = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));

    window.scrollTo({
      top: paragraphref.current.offsetTop,
      behavior: "smooth",
    });
  };
  const upHandle = () => {
    window.scrollTo(0, 0);
    setArrowUpOpen(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY < 200) {
        setArrowUpOpen(false);
      } else {
        setArrowUpOpen(true);
      }
    });
  }, [arrowUpOpen]);

  const handleResize = () => {
    if (window.innerWidth < 640) {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
  };

  const favHandle = (char) => {
    const favItem = favourites.map((f) => f.id).includes(char.id);

    if (!favItem) {
      setFavourite((prevFav) => [...prevFav, char]);
    }

    console.log(favItem);
  };

  const removeFavHandle = (id) => {
    const filteredFavourites = favourites.filter((fav) => fav.id !== id);
    if (favourites.length === 1) {
      setOpen(false);
    }
    setFavourite(filteredFavourites);
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
  // console.log(height);
  return (
    <div ref={refValue}>
      <Toaster />
      <Navbar
        toggleSearchHandler={toggleSearchHandler}
        setThemeHandler={setThemeHandler}
        theme={theme}
        query={query}
        setQuery={setQuery}
        favourites={favourites}
        setOpen={setOpen}
      />
      {open && favourites.length > 0 && (
        <Modal setOpen={setOpen}>
          <div
            className={`${
              favourites.length > 1 ? "overflow-y-scroll  " : ""
            } max-h-96 h-60 gap-2`}
          >
            {favourites.map((fav) => (
              <CharacterItem item={fav} key={fav.id} open={open}>
                <button onClick={() => removeFavHandle(fav.id)}>
                  <TrashIcon className="icon red" />
                </button>
              </CharacterItem>
            ))}
          </div>
        </Modal>
      )}

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
          selectedId={selectedId}
          showHandler={showHandler}
          open={open}
        />

        <div className="characterDetail" ref={paragraphref}>
          <CharacterDetail
            selectedId={selectedId}
            favHandle={favHandle}
            favourites={favourites}
          />
        </div>
      </div>

      <div
        className={`sticky bottom-0 right-0 flex justify-end ${
          arrowUpOpen ? "opacity-100  h-full" : "opacity-0"
        }`}
      >
        <button onClick={upHandle}>
          <ArrowUpCircleIcon className="iconUp " />
        </button>
      </div>
    </div>
  );
}

export default App;
