import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
const ArrowUpComponent = ({arrowUpOpen,upHandle}) => {
  return (
    <div
      className={`sticky bottom-0 right-0 flex justify-end ${
        arrowUpOpen ? "opacity-100  h-full" : "opacity-0"
      }`}
    >
      <button onClick={upHandle}>
        <ArrowUpCircleIcon className="iconUp " />
      </button>
    </div>
  );
};

export default ArrowUpComponent;
