import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterDetail from "./components/CharacterDetail/CharacterDetail";
import { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
import CharacterItem from "./components/CharacterItem/CharacterItem";
import useFetch from "./hooks/useFetch";
import useLocalStorage from "./hooks/useLocalStorage";
import ArrowUpComponent from "./components/ArrowUpComponent";
import SearchToggle from "./components/SearchToggle";

function App() {
  //states and customHooks
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

  //useEffects and Handlers
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
  /////////////////////////////////////////////////
  return (
    <>
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
      <SearchToggle query={query} setQuery={setQuery} openSearch={openSearch} />
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

      <ArrowUpComponent arrowUpOpen={arrowUpOpen} upHandle={upHandle} />
    </>
  );
}

export default App;
