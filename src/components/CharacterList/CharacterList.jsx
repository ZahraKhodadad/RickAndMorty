import CharacterItem from "../CharacterItem/CharacterItem";
import Loader from "../Loader";

const CharacterList = ({ characters, paragraphref, loading }) => {
  if (loading)
    return (
      <div className="characterList">
        <Loader />
      </div>
    );

  return (
    <div className="characterList">
      {characters.map((c) => (
        <CharacterItem key={c.id} item={c} paragraphref={paragraphref} />
      ))}
    </div>
  );
};

export default CharacterList;
