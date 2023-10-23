import CharacterItem from "../CharacterItem/CharacterItem";


const CharacterList = ({ Characters }) => {
  return (
    <div className="characterList">
      {Characters.map((c) => (
        <CharacterItem key={c.id} item={c} />
      ))}
    </div>
  );
};

export default CharacterList;
