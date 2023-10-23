import { EyeIcon } from "@heroicons/react/24/outline";

const CharacterItem = ({ item }) => {
  return (
    <div className="characterItem group ">
      <div className="overflow-hidden md:col-span-4 col-span-12 flex justify-center items-center">
        <img className="group-hover:scale-125 transitionParam object-scale-down" src={item.image} />
      </div>

      <div className="group-hover:text-slate-50 transitionParam md:col-span-8 col-span-12 grid gap-2 grid-cols-6 p-1 medium:p-4 md:p-2">
        <CharacterItem_Info item={item} />
        <div className="flex justify-center items-center col-span-1">
          <EyeIcon className="icon red" />
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
        {item.status}&nbsp;-&nbsp;{item.species}
      </div>
    </div>
  );
};
