import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div
      className="dark:text-slate-300 text-slate-900 md:col-span-12 grid grid-cols-12"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <p> Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
  );
}

export default Loader;
