import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import CharacterItem from "../CharacterItem/CharacterItem";
import Loader from "../Loader";

const CharacterList = ({
  characters,
  loading,
  selectedId,
  showHandler,
  open,
}) => {
  if (loading)
    return (
      <div className="characterList">
        <Loader />
      </div>
    );

  return (
    <div className="characterList">
      {characters.map((c) => (
        <CharacterItem item={c} key={c.id} open={open}>
          <div
            onClick={() => showHandler(c.id)}
            className="flex justify-center items-center col-span-1 group"
          >
            {selectedId === c.id ? (
              <EyeSlashIcon className="icon red group-hover:text-rose-100" />
            ) : (
              <EyeIcon className="icon red group-hover:text-rose-100" />
            )}
          </div>
        </CharacterItem>
      ))}
    </div>
  );
};

export default CharacterList;
