import { useEffect, useRef, useState } from "react";

import { CharacterItem_Info } from "../CharacterItem/CharacterItem";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import Loader from "../Loader";
import toast from "react-hot-toast";
import axios from "axios";
const CharacterDetail = ({ selectedId, favHandle, favourites, error }) => {
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        // console.log(data);
        setCharacter(data);
        const episodeId = data.episode.map((e) => e.split("/").at(-1));
        // console.log(episodeId);
        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        setEpisodes([episodeData].flat());
      } catch (error) {
        setCharacter(null);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedId) fetchCharacter();
  }, [selectedId]);

  if (loading) return <Loader />;
  if (error !== null) return <p>There is no result for this character!</p>;
  if (!selectedId || !character) return <p>please click on a Character</p>;

  return (
    <>
      <CharacterDetail_data
        character={character}
        favHandle={favHandle}
        favourites={favourites}
      />
      <CharacterDetail_Episodes episodes={episodes} />
    </>
  );
};

export default CharacterDetail;

const CharacterDetail_data = ({ character, favHandle, favourites }) => {
  return (
    <div className="characterDetail_Info">
      <div className="col-span-6 ">
        <img src={character.image} />
      </div>
      <div className="characterDetail_Info_text">
        <CharacterItem_Info item={character} />
        <div>
          <span className="opacity-50">Last known location</span>
          <p>{character.location.name}</p>
        </div>
        <div>
          {favourites.map((f) => f.id).includes(character.id) ? (
            <p>This has Already been Exist💹</p>
          ) : (
            <button className="btn_dark" onClick={() => favHandle(character)}>
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const CharacterDetail_Episodes = ({ episodes }) => {
  const [sort, setSorted] = useState(false);
  let sortedEpisode;

  if (sort === false) {
    sortedEpisode = episodes.sort(
      (a, b) => new Date(a.air_date) - new Date(b.air_date)
    );
  } else {
    sortedEpisode = episodes.sort(
      (a, b) => new Date(b.air_date) - new Date(a.air_date)
    );
  }

  return (
    <div className={`characterDetail_Episodes`}>
      <div>
        <div className="episodeHeader ">
          <strong>List of Episodes</strong>

          <ArrowUpCircleIcon
            onClick={() => setSorted((prev) => !prev)}
            className={`icon ${sort ? "rotate-0" : "-rotate-180"}`}
          />
        </div>
        <div
          className={`${
            episodes.length > 3 ? "overflow-y-scroll" : ""
          } p-2 h-30 max-h-80 episodeList text-sm`}
        >
          {sortedEpisode.map((item, index) => (
            <div key={item.id} className="episodeList_item ">
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
    </div>
  );
};
