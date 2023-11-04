import { XCircleIcon } from "@heroicons/react/24/outline";

const Modal = ({ setOpen, children }) => {
  return (
    <div>
      <div className="backdrop" onClick={() => setOpen((prev) => !prev)}></div>
      <div className="modal">
        <div className="modal_header mb-2">
          <h2 className="title">List of Favourites</h2>
          <button onClick={() => setOpen((prev) => !prev)}>
            <XCircleIcon className="icon red" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
