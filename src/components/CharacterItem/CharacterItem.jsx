import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const CharacterItem = ({ item, children, open }) => {
  return (
    <div
      className={`characterItem ${
        open ? "" : "group hover:bg-rose-700 hover:dark:bg-slate-700"
      }`}
    >
      <div className="characterItem_image ">
        <img
          className={`${
            open ? "" : "group-hover:scale-125"
          } scale-105 transitionParam object-scale-down`}
          src={item.image}
        />
      </div>

      <div
        className={`characterItem_Data ${
          open ? "" : "group-hover:text-slate-50"
        }`}
      >
        <CharacterItem_Info item={item} />
        {children}
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
