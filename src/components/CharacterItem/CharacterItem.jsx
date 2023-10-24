import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CharacterItem = ({ item, paragraphref }) => {
  const [openItem, setOpenItem] = useState(false);
  const showHandler = (id) => {
    if (window.innerWidth < 740) {
      window.scrollTo({
        top: paragraphref.current.offsetTop,
        behavior: "smooth",
      });
    }
    setOpenItem((prev) => !prev);
  };
  return (
    <div className="characterItem group ">
      <div className="overflow-hidden md:col-span-4 col-span-12 flex justify-center items-center">
        <img
          className="group-hover:scale-125 scale-105 transitionParam object-scale-down"
          src={item.image}
        />
      </div>

      <div className="group-hover:text-slate-50 transitionParam md:col-span-8 col-span-12 grid gap-2 grid-cols-6 p-1 medium:p-4 md:p-2">
        <CharacterItem_Info item={item} />
        <div
          onClick={() => showHandler(item.id)}
          className="flex justify-center items-center col-span-1 group"
        >
          {openItem ? (
            <EyeSlashIcon className="icon red group-hover:text-rose-100" />
          ) : (
            <EyeIcon className="icon red group-hover:text-rose-100" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterItem;

export const CharacterItem_Info = ({ item }) => {
  return (
    <div className="characterItem_Info ">
      <h3>
        <span style={{ fontSize: "12px" }}>
          {item.gender === "Male" ? "👦" : "👧"}
        </span>
        <strong>{item.name}</strong>
      </h3>
      <div>
        <span style={{ fontSize: "8px" }}>
          {item.status === "Dead" ? "🔴" : "🟢"}&nbsp;
        </span>
        <span style={{ fontSize: "14px" }}>
          {" "}
          {item.status}&nbsp;-&nbsp;{item.species}
        </span>
      </div>
    </div>
  );
};
