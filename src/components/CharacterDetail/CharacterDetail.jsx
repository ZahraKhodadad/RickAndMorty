import { useEffect, useRef } from "react";
import { character } from "../../../data/data";
import { CharacterItem_Info } from "../CharacterItem/CharacterItem";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { episodes } from "../../../data/data";
const CharacterDetail = () => {
  return (
    <>
      <CharacterDetail_data />
      <CharacterDetail_Episodes />
    </>
  );
};

export default CharacterDetail;

const CharacterDetail_data = () => {
  return (
    <div className="characterDetail_Info grid grid-cols-12 overflow-hidden gap-4 dark:bg-slate-800 bg-rose-200 rounded">
      <div className="col-span-6 ">
        <img src={character.image} />
      </div>
      <div className="col-span-6 flex flex-col gap-3 mt-4 leading-7 md:leading-4 medium:leading-6 lg:leading-8">
        <CharacterItem_Info item={character} />
        <div>
          <span className="opacity-50">Last known location</span>
          <p>{character.location.name}</p>
        </div>
        <div>
          <button className="p-2 text-slate-50 rounded-xl bg-slate-700 text-sm font-bold">
            Add to Favourite
          </button>
        </div>
      </div>
    </div>
  );
};

export const CharacterDetail_Episodes = () => {
  return (
    <div className="characterDetail_Episodes dark:bg-slate-800 bg-rose-200 rounded p-2">
      <div className="episodeHeader flex justify-between items-center">
        <strong>List of Episodes</strong>
        <ArrowUpCircleIcon className="icon" />
      </div>
      <div className="episodeList text-sm">
        {episodes.map((item, index) => (
          <div
            key={item.id}
            className="episodeList_item flex justify-between items-center mt-2"
          >
            <div className="episodeList_item_Desc">
              {String(index + 1).padStart(2, "0")} -&nbsp;
              <span>{item.episode}</span>&nbsp;:&nbsp;
              <strong>{item.name}</strong>
            </div>
            <div className="episodeList_item_Time">{item.air_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
