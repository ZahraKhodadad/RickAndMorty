import { useEffect, useState } from "react";

import "./App.css";
import Navbar, { Search } from "./components/Navbar/Navbar";

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  // const [t,setT] = useState(true)
  const toggleSearchHandler = () => {
    setOpenSearch((prev) => !prev);
    // setT(prev=>!prev)
  };
  const handleResize = () => {
    if (window.innerWidth < 640) {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  return (
    <>
      <Navbar toggleSearchHandler={toggleSearchHandler} />

      <div className={`bg-slate-700 rounded-[5px] p-1 toggleSearch ${openSearch ? "sm:hidden flex" : ""}`}>
        <Search>
          <div className="nav_result">
            <span>X Character Exsist</span>
          </div>
        </Search>
      </div>
    </>
  );
}

export default App;
